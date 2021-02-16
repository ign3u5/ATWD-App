import { PageContent } from './pageContent';

export interface PageData
{
    [pageName: string]: Map<number, string>;
}