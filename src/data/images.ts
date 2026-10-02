import manifest from '../generated/images.json';
export type PortfolioImage = { src: string; srcSet: string; width: number; height: number; alt: string };
export function getImage(key: string): PortfolioImage {
  const result = (manifest as Record<string, PortfolioImage>)[key];
  if (!result) throw new Error(`Missing portfolio image: ${key}`);
  return result;
}
