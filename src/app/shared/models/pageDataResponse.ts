import { PageContentsResponse } from './pageContentResponse';

export interface PageDataResponse{
    pageName: string;
    pageContents: PageContentsResponse[];
}