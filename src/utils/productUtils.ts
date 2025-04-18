import sitemapJSON from '../data/site.json';
import type { Product, Category, Sitemap, Link } from '../types/common';

const sitemap = sitemapJSON as any as Sitemap;

export async function getCatalogLinks(): Promise<Link[]> {
    const catalogLinks: Link[] = [];
    // const sitemap = sitemapJSON as Sitemap;

    for (const key in sitemap) {
        const category = sitemap[key] as Category;
        if (sitemap.hasOwnProperty(key)) {
            const products = category.products as Product[];
            const url = `${import.meta.env.BASE_URL}/${key}`;

            let models = [...new Set(products.map(product => product['Модель']))];
            
            const models_ = models.map((model) => {
                return {
                    url: `${import.meta.env.BASE_URL}/Каталог/${key}/${model}`,
                    text: model
                } as Link;
            });

            const link = {
                url: url,
                text: key,
                links: models_
            } as Link;

            catalogLinks.push(link);
        }
    }

    return catalogLinks;
}
export function getUniqueValues(products: Product[], field: string): (string | number)[] {
    return [...new Set(products.map(product => product[field]))].sort((a, b) => Number(a) - Number(b));
}

export function getUniqueFieldValues(category: string, field: string, model?: string): (string | number)[] {
    // console.log(model);
    const products = model 
        ? getModelProducts(category, model)
        : getCategoryProducts(category);
    return getUniqueValues(products, field);
}

export function getCategoryProducts(category: string): Product[] {
    return sitemap[category]?.products || [];
}

export function getModelProducts(category: string, model: string): Product[] {
    return getCategoryProducts(category).filter(product => product['Модель'] === model);
}
export function getModelProducts_(category: string, model: string): Product[] {
    // console.log('Filtering for model:', model); // Debug log
    const products = getCategoryProducts(category);
    const filtered = products.filter(product => product['Модель'].trim() === model.trim());
    // console.log('Found products:', filtered.length); // Debug log
    return filtered;
}

// New function to filter radiator products by model and type
export function getFilteredRadiatorProducts(model: string, type: string | number): Product[] {
    const category = "Стальные панельные радиаторы";
    const products = getCategoryProducts(category);
    
    return products.filter(product => 
        product['Модель'] === model && 
        product['Тип'] === type
    );
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
        url: `${import.meta.env.BASE_URL}/Каталог/${category}/${model}`,
        // absolute_url: 
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
// Add this new function
export function findProductsByDimension(
    category: string,
    currentProduct: Product,
    dimensionField: string,
    dimensionValues: (string | number)[],
    model?: string
): Product[] {
    const products = model 
        ? getModelProducts(category, model)
        : getCategoryProducts(category);

    return products.filter(product => {
        // Check if the product has one of the target dimension values
        const matchesDimension = dimensionValues.includes(product[dimensionField]);
        
        // // For power variants, we only need to match the other dimensions
        // if (dimensionField === 'Теплоотдача, Вт') {
        //     return matchesDimension && product['Модель'] === currentProduct['Модель'];
        // }
        
        // For height/length/depth variants, keep other dimensions the same
        const sameOtherDimensions = ['Высота, мм', 'Длина, мм', 'Глубина, мм', 'Ширина, мм']
            .filter(field => field !== dimensionField)
            .every(field => product[field] === currentProduct[field]);

        // Keep the same model
        const sameModel = product['Модель'] === currentProduct['Модель'];

        return matchesDimension && sameOtherDimensions && sameModel;
    }).sort((a, b) => Number(a[dimensionField]) - Number(b[dimensionField]));
}