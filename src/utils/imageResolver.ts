import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>('/src/images/*/*.{jpeg,jpg,png,gif,webp}');
const FULL_FALLBACK_PATH = "/src/images/products/fullfallback.webp";

function getFallbackImagePath(imagePath: string, model: string): string {
    const pathParts = imagePath.split('/');
    pathParts[pathParts.length - 1] = `${model}.webp`;
    return pathParts.join('/');
}

export async function resolveImagePath(imagePath: string, model?: string, folder = "products"): Promise<ImageMetadata> {
    const fallbackPath = `/src/images/${folder}/${imagePath}`;
    // console.log(fallbackPath);
    if (!images[imagePath]) {
        if (model) {
            const modelFallbackPath = getFallbackImagePath(imagePath, model);
            if (images[modelFallbackPath]) {
                return (await images[modelFallbackPath]()).default;
            }
        }

        if (images[fallbackPath]) {
            return (await images[fallbackPath]()).default;
        }

        if (!images[FULL_FALLBACK_PATH]) {
            throw new Error(`${FULL_FALLBACK_PATH} fallback image does not exist`);
        }
        return (await images[FULL_FALLBACK_PATH]()).default;
    }

    return (await images[imagePath]()).default;
}