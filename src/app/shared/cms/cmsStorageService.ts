import { Collection, Dexie } from 'dexie';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { PageData } from './models/pageData';
import { PageContent } from './models/pageContent';
import { from, observable, Observable, Subject } from 'rxjs';
import { HttpDataService } from '../services/httpDataService';
import { map, switchMap, tap } from 'rxjs/operators';
import { PageDataContent } from './models/pageDataContent';


@Injectable()
export class CMSStorageService
{
    private db: any;
    private dbName: string;
    public pages: PageDataContent[] = [{pageName: "aboutUs", contentId: 3, content: "Bing"}];
    public loadedPages: Subject<PageDataContent[]> = new Subject<PageDataContent[]>();

    public constructor(private client: HttpDataService)
    {
        this.dbName = "skylabdb";
        this.createDb();
        this.defineDbSchema();

    }

    private createDb()
    {
        this.db = new Dexie(this.dbName);
    }

    private defineDbSchema()
    {
        this.db.version(1).stores({
            pages: "[pageName+contentId], content"
        });
    }

    public loadPages(): Observable<void>
    {
        return this.client.getAllPages()
        .pipe(
            switchMap(pages => 
                this.addPageData(pages)),
            switchMap(() => this.readAllPageData()),
            map(() => {
                console.log("Pages finished adding to memory");
                this.loadedPages.next(this.pages);
            })
        )
    }
    
    private addPageData(pages: PageDataContent[]): Observable<void>
    {
        console.log(`Adding page data to database from http client. Page: ${JSON.stringify(pages)}`);
        return from(this.db.pages
            .bulkAdd(pages)
            .catch('BulkError', err => {
                err.failures.forEach(failure => console.log(`${failure.message}`))
            }) as Promise<void>);
    }

    private readAllPageData(): Observable<void>
    {
        console.log("Started loading page data to memory from database");
        return from(this.db.pages.each(page => {
            this.pages.push({
                pageName: page.pageName,
                contentId: page.contentId,
                content: page.content
            });
            console.log(`${page.pageName}, contentId: ${page.contentId} added to memory`);
        }) as Promise<void>);
    }

    public getContent(pageName: string, contentId: number): Observable<string>
    {
        return this.loadedPages.pipe(
            map(() =>
            {  
                console.log(`Attempting to read page information (pageName: ${pageName}, contentId: ${contentId}) from ${JSON.stringify(this.pages)}`);
                return this.pages.find(page => page.pageName == pageName && page.contentId == contentId).content
            }));
    }

    public updateContent(pageName: string, contentId: number, content: string): void
    {
        
    }
}