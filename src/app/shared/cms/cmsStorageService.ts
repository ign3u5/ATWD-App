import { Injectable } from '@angular/core';
import { PageData } from './models/pageData';
import { Observable } from 'rxjs';
import { HttpDataService } from '../services/httpDataService';
import { map } from 'rxjs/operators';
import { PageDataResponse } from '../models/pageDataResponse';
import { PageContentsResponse } from '../models/pageContentResponse';



@Injectable()
export class CMSStorageService
{
    public pageData: PageData;
    public constructor(private client: HttpDataService)
    {
        this.pageData = [] as any;
    }

    public loadPage(pageName: string): Observable<string>
    {
        if (this.pageData[pageName])
        {
            console.log(`Memory contains page data for ${pageName}.`);
            return new Observable<string>(observer => 
                observer.next(pageName));
        }
        else
        {
            console.log(`Memory does not contain page data for ${pageName}, setting page name observable to wait for API to return data to memory.`);
            return this.client.getPage(pageName).pipe(
                map(page => {
                    this.pageData[pageName] = page[pageName];
                    console.log(`The following content for ${pageName} is being added to memory: ${JSON.stringify(page[pageName])}`);
                    return pageName;
                })
            )
        }
    }

    public updatePage(pageName: string): Observable<void>
    {
        console.log("Updated page was called, CMS Storage Service");
        if (this.pageData[pageName])
        {
            let updatedPageData: PageDataResponse = {pageName: pageName, pageContents: []}
            for (let pageContent in this.pageData[pageName])
            {
                let updatedPageContents: PageContentsResponse = {
                    contentId: pageContent,
                    content: this.pageData[pageName][pageContent]
                }
                updatedPageData.pageContents.push(updatedPageContents);
            }
            return this.client.updatePage(updatedPageData).pipe(map(() => console.log("Page successfully updated")));
        }
        else
        {
            console.error("Page data has not yet been loaded");
            return new Observable(observer => observer.next());
        }
    }
}