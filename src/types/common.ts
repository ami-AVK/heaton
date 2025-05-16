export interface Link {
[x: string]: any;
    url: string;
    text: string;
    links?: Link[];
}
export interface Characteristic {
    header: string;
    value: string;
    interactive?: boolean;
    variants?: Array<{
        value: string | number;
        product: Product;
    }>;
}
export interface Product {
    'Наименование': string;
    url: string;
    'Модель': string;
    [key: string]: any;
}

export interface Category {
    ['Заголовок на главную']: string;
    ['Описание на главную']: string;
    ['Заголовок в карточку']: string;
    ['Описание в карточку']: string;
    products: Product[];
    [key: string]: any;
}

export interface Sitemap {
    [key: string]: Category;
}