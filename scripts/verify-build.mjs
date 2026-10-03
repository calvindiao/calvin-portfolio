import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=new URL('../dist/',import.meta.url).pathname;
async function walk(dir){const entries=await fs.readdir(dir,{withFileTypes:true});return (await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat();}
const files=await walk(root);
const htmlFiles=files.filter(file=>file.endsWith('.html'));
const required=['index.html','about/index.html','writing/index.html','404.html','ar-panoramic-calling/index.html','gsoc/index.html','wearable-rehab-mocap/index.html','smart-car-2021/index.html','smart-car-2020/index.html','2020/03/24/hello-world/index.html'];
for(const route of required)await fs.access(path.join(root,route));
for(const slug of ['ar-panoramic-calling','gsoc','wearable-rehab-mocap','smart-car-2021','smart-car-2020'])await fs.access(path.join(root,'projects',slug,'index.html'));
let imageCount=0;
for(const file of htmlFiles){
  const html=await fs.readFile(file,'utf8');
  assert.match(html,/<meta name="robots" content="noindex, nofollow"/,'Every preview page must prevent indexing');
  assert.match(html,/<link rel="canonical" href="https:\/\//);
  assert.doesNotMatch(html,/<iframe\b/,'Videos must be click-to-load');
  for(const match of html.matchAll(/\b(?:src|href)="(\/[^"#]*)/g)){
    const reference=decodeURIComponent(match[1].split('?')[0]);
    const target=path.join(root,reference.endsWith('/')?reference+'index.html':reference);
    await fs.access(target).catch(()=>{throw new Error(`Broken local reference ${reference} in ${path.relative(root,file)}`);});
  }
  for(const match of html.matchAll(/<img\b[^>]*>/g)){
    if (!/\bsrc="/.test(match[0])) continue; // The closed lightbox has an unpopulated image slot.
    imageCount++;
    assert.match(match[0],/alt="[^"]+"/,'Images need meaningful alt text');
    assert.match(match[0],/width="\d+"/);assert.match(match[0],/height="\d+"/);
  }
}
const manifest=JSON.parse(await fs.readFile(new URL('../src/generated/images.json',import.meta.url),'utf8'));
const hero=manifest['AR/result2.png'];
assert.ok((await fs.stat(path.join(root,hero.src))).size<=250*1024,'Main AR image must stay below 250 KB');
assert.match(await fs.readFile(path.join(root,'robots.txt'),'utf8'),/Disallow: \//);
assert.match(await fs.readFile(path.join(root,'_headers'),'utf8'),/X-Robots-Tag: noindex, nofollow/);
await fs.access(path.join(root,'sitemap-index.xml'));
const home=await fs.readFile(path.join(root,'index.html'),'utf8');
assert.equal(home.match(/<article class="card /g)?.length,5,'The home page needs one card per project');
assert.match(home,/class="hero stage"/,'The home page opens on the hero');
for(const slug of ['ar-panoramic-calling','gsoc','wearable-rehab-mocap','smart-car-2021','smart-car-2020']){
  assert.match(home,new RegExp(`href="/projects/${slug}/"`),`The home page must link to ${slug}`);
  const page=await fs.readFile(path.join(root,'projects',slug,'index.html'),'utf8');
  assert.match(page,/class="flow"/,`${slug} needs its block diagram`);
  assert.match(page,/class="facts"/,`${slug} needs its key facts`);
}
for(const asset of ['share.png','favicon.svg','media/apple-touch-icon.png'])await fs.access(path.join(root,asset));
assert.ok((await fs.stat(path.join(root,'share.png'))).size<=300*1024,'Share image must stay below 300 KB');
console.log(`Verified ${htmlFiles.length} pages, ${imageCount} image references, all legacy URLs, preview noindex, sitemap, project cards, project diagrams, share image, and hero image budget.`);
