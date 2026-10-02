import fs from 'node:fs';
export default function legacyImages() {
  const images=JSON.parse(fs.readFileSync(new URL('../src/generated/images.json',import.meta.url),'utf8'));
  const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;');
  function visit(node) {
    if (node.type==='html') node.value=node.value.replace(/<img\b[^>]*>/gi,tag=> {
      const src=tag.match(/src="([^"]+)"/i)?.[1];
      if (!src?.startsWith('/assets/')) return tag;
      const image=images[decodeURIComponent(src.replace('/assets/',''))];
      if (!image) throw new Error(`Unmapped legacy image: ${src}`);
      const clean=tag.replace(/\s(?:src|srcset|width|height|alt|loading|sizes)\s*=\s*"[^"]*"/gi,'').replace(/\s*\/?>$/,'');
      return `${clean} src="${image.src}" srcset="${escape(image.srcSet)}" width="${image.width}" height="${image.height}" alt="${escape(image.alt)}" loading="lazy" decoding="async" sizes="(max-width: 800px) 95vw, 800px">`;
    });
    node.children?.forEach(visit);
  }
  return visit;
}
