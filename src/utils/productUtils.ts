import sitemapJSON from '../data/site.json';
import type { Product, Category, Sitemap, Link } from '../types/common';

const sitemap = sitemapJSON as any as Sitemap;

export function getUniqueValues(products: Product[], field: string): (string | number)[] {
    return [...new Set(products.map(product => product[field]))].sort((a, b) => Number(a) - Number(b));
}

export function getUniqueFieldValues(category: string, field: string): (string | number)[] {
    const products = getCategoryProducts(category);
    return getUniqueValues(products, field);
}

export function getCategoryProducts(category: string): Product[] {
    return sitemap[category]?.products || [];
}

export function getModelProducts(category: string, model: string): Product[] {
    return getCategoryProducts(category).filter(product => product['Модель'] === model);
}

export function getAllCategories(): string[] {
    return Object.keys(sitemap);
}

export function getCategoryModels(category: string): string[] {
    const products = getCategoryProducts(category);
    return [...new Set(products.map(product => product['Модель']))];
}

export function getCategoryLinks(category: string): Link[] {
    const models = getCategoryModels(category);
    return models.map(model => ({
        url: `/Каталог/${category}/${model}`,
        text: model
    }));
}

export function getNavigationLinks(): Link[] {
    return getAllCategories().map(category => ({
        url: `/Каталог/${category}`,
        text: category,
        links: getCategoryLinks(category)
    }));
}

export function getCategoryInfo(category: string) {
    return {
        title: sitemap[category]?.['Заголовок на главную'],
        description: sitemap[category]?.['Описание на главную'],
        cardTitle: sitemap[category]?.['Заголовок в карточку'],
        cardDescription: sitemap[category]?.['Описание в карточку']
    };
}

export function findProduct(category: string, criteria: Partial<Product>): Product | undefined {
    return getCategoryProducts(category).find(product => 
        Object.entries(criteria).every(([key, value]) => product[key] === value)
    );
}

export function findSimilarProducts(
    category: string,
    product: Product,
    column: string,
    limit: number = 5,
    model?: string
): Product[] {
    const targetValue = product[column];
    const products = model 
        ? getModelProducts(category, model)
        : getCategoryProducts(category);

    // Filter out the current product and sort by similarity
    return products
        .filter(p => p.Наименование !== product.Наименование) // Exclude current product
        .sort((a, b) => {
            const aDiff = Math.abs(Number(a[column]) - Number(targetValue));
            const bDiff = Math.abs(Number(b[column]) - Number(targetValue));
            return aDiff - bDiff;
        })
        .slice(0, limit);
}