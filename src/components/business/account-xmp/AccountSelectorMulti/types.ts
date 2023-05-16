import { IListItem } from '@/components/FilterList/type';

export interface IAccountItem extends IListItem{
    is_collect: '1'|'0';
    company_name: string;
    auth_status: string;
}
