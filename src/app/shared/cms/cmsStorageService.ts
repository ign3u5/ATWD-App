import { Collection, Dexie } from 'dexie';
import { Injectable } from '@angular/core';
import { PageData } from './models/pageData';
import { PageContent } from './models/pageContent';
import { from, observable, Observable, Subject } from 'rxjs';
import { HttpDataService } from '../services/httpDataService';
import { map, switchMap, tap } from 'rxjs/operators';
import { PageDataContent } from './models/pageDataContent';


@Injectable()
export class CMSStorageService
{
    public pageData: PageData;
    public constructor(private client: HttpDataService)
    {
        this.pageData = [] as any;
    }

    public loadPage(pageName: string)
    {
        return this.client.getPage(pageName).pipe(
            map(page => {
                this.pageData[pageName] = page[pageName];
                console.log(`Page data being added to memory: ${JSON.stringify(page[pageName])}`);
            })
        )
    }
}