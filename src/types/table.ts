export interface TableColumn {
    value: string;
    sortable: boolean;
    filterable: boolean;
    unit?: string;
}

export interface TableProps {
    products: any[];
    columns: TableColumn[];
    category: string;
    class?: string;
    url?: string;
}

export interface FilterState {
    [key: string]: Set<string | number>;
}