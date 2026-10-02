import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root = new URL('../', import.meta.url).pathname;
const original = path.join(root, 'src/assets-originals');
const output = path.join(root, 'public/media');
await fs.mkdir(output, { recursive: true });
await fs.mkdir(path.join(root, 'src/generated'), { recursive: true });
const descriptions = {
  'AR/arcover.png': 'A panoramic room view beside a user wearing Rokid AR glasses',
  'AR/workflow.png': 'Capture, cloud distribution, and playback architecture of the AR calling system',
  'AR/result2.png': 'An AR calling session using Rokid Air glasses',
  'AR/UML.jpeg': 'Class structure of the Unity AR calling application',
  'mocap/prototype.png': 'Wearable motion capture prototype with sensors and a 3D body visualization',
  'mocap/prototype2.jpg': 'The wearable sensor prototype',
  'mocap/hardware.png': 'Circuit board for the wearable motion capture system',
  'mocap/hardware workflow.png': 'Hardware architecture of the motion capture system',
  'mocap/Kalman filter.png': 'Kalman filter diagram for sensor fusion',
  'mocap/3D Modeling.png': 'Three-dimensional modeling of the wearable device',
  'mocap/angle test.jpg': 'Angle measurement test for the motion capture device',
  '2021/20210816_030631.jpg': 'A self-balancing motorcycle prototype on an electromagnetic track',
  '2021/20210824_190540.jpg': 'The autonomous motorcycle prototype and its electronics',
  '2021/IMG_20210814_051006.jpg': 'Mechanical assembly of the self-balancing motorcycle',
  '2021/IMG_20210814_051429.jpg': 'The motorcycle prototype during development',
  '2021/photo.jpg': 'The completed 2021 smart car project',
  '2020/20200925_143817.jpg': 'Overhead view of a Mecanum-wheeled acoustic beacon tracking robot',
  '2020/20200609_223638.jpg': 'Early prototype of the acoustic localization robot',
  'gsoc/certificate.png': 'Google Summer of Code 2025 completion certificate for Chenhao Diao',
  'avatar.jpg': 'Calvin Diao outdoors with his camera'
};
async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir,e.name)) : path.join(dir,e.name)));
  return files.flat().sort();
}
const manifest = {};
for (const file of await walk(original)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  const key = path.relative(original,file);
  const bytes = await fs.readFile(file);
  const hash = createHash('sha256').update(bytes).update('webp-v1-q78').digest('hex').slice(0,12);
  const widths = key === 'avatar.jpg' ? [128,256,384] : [480,960,1440];
  const versions = [];
  for (const width of widths) {
    const name = `${hash}-${width}.webp`;
    const target = path.join(output,name);
    try { await fs.access(target); } catch {
      await sharp(bytes).rotate().resize({width,withoutEnlargement:true}).webp({quality:78}).toFile(target);
    }
    const meta = await sharp(target).metadata();
    if (!versions.some(v => v.width === meta.width)) versions.push({src:`/media/${name}`,width:meta.width,height:meta.height});
  }
  const largest=versions.at(-1);
  manifest[key]={...largest,srcSet:versions.map(v=>`${v.src} ${v.width}w`).join(', '),alt:descriptions[key] || (key.includes('team') || key.includes('159853') ? 'Project team at the smart car competition' : 'Smart car competition award certificate')};
}
manifest['chromium-flow']={src:'/visuals/chromium-flow.svg',srcSet:'',width:1200,height:750,alt:'A diagram showing DNS resolver error metadata being parsed by Chromium'};
await fs.writeFile(path.join(root,'src/generated/images.json'),JSON.stringify(manifest,null,2)+'\n');
const arBytes=await fs.readFile(path.join(output,path.basename(manifest['AR/result2.png'].src)));
const shareSvg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#FFFFFF"/><text x="60" y="87" fill="#252629" font-family="sans-serif" font-size="27">Calvin Diao</text><text x="56" y="244" fill="#252629" font-family="sans-serif" font-size="76" font-weight="500">From circuits</text><text x="56" y="333" fill="#252629" font-family="sans-serif" font-size="76" font-weight="500">to Chromium.</text><text x="60" y="401" fill="#686C75" font-family="sans-serif" font-size="23">Software &amp; hardware engineer</text><rect x="60" y="475" width="235" height="57" rx="28.5" fill="#365CF5"/><text x="91" y="512" fill="white" font-family="sans-serif" font-size="23">Explore the work</text><defs><clipPath id="photo"><rect x="650" y="60" width="490" height="510" rx="18"/></clipPath></defs><image href="data:image/webp;base64,${arBytes.toString('base64')}" x="650" y="60" width="490" height="510" preserveAspectRatio="xMidYMid slice" clip-path="url(#photo)"/></svg>`;
await sharp(Buffer.from(shareSvg)).png().toFile(path.join(root,'public/media/share.png'));
console.log(`Prepared ${Object.keys(manifest).length} responsive image entries.`);
