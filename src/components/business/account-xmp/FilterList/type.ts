export interface IFilterListValue<T = IListItem> {
    type: string;
    data: string[];
    dataWithLabel?: T[];
}

export interface IListItem {
    label: string;
    value: string;
    disable?: boolean;
    [key: string]: any;
}

export interface IFilterValue {
    search?: string;
    pageSize?: number;
    page?: number;
}

export interface ICategoryItem {
    value: string;
    label: string;
}

export interface IFetchResponse {
    list: IListItem[],
    total: number
}
