import { Collection, Dexie } from 'dexie';
import "dexie-observable";
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { PageData } from './models/pageData';
import { PageContent } from './models/pageContent';
import { from, observable, Observable } from 'rxjs';
import { HttpDataService } from '../services/httpDataService';
import { map, switchMap, tap } from 'rxjs/operators';
import { PageDataContent } from './models/pageDataContent';


@Injectable()
export class CMSStorageService
{
    private db: any;
    private dbName: string;
    public pages: PageData;

    public constructor(private client: HttpDataService)
    {
        this.dbName = "skylabdb";
        this.createDb();
        this.defineDbSchema();
        this.db.on("changes", (changes) => {
            changes.forEach(change => {
                alert(change.type);
            });
        });
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
            map(pages => 
                pages.forEach(page => 
                    this.addPageData(page))
                ),
            map(() => this.getPageNames()),
            map(pageNames => {
                for (var pageName in pageNames)
                {
                    this.readPageData(pageName);
                }
            }))
    }
    
    private addPageData(page: PageDataContent): Observable<void>
    {
        return from(this.db.pages
            .add({pageName: page.pageName, contentId: page.contentId, content: page.content})
            .catch('ConstraintError', (_error) => {
                console.log("Attempted to add a value that already exists");
            }) as Promise<void>);
    }

    private getPageNames(): Observable<string[]>
    {
        return from(this.db.pages.orderBy("pageName").distinct().toArray() as Promise<string[]>);
    }

    private readPageData(pageName: string): Observable<void>
    {
        return from(this.db.pages.where("[pageName+contentId]").between([pageName, Dexie.minKey], [pageName, Dexie.maxKey]).each((pageData) => {
            this.pages[pageName][pageData.contentId] = pageData.content;
        }) as Promise<void>);
    }

    /*
    public loadPage(pageName: string): Observable<string>
    {
        return this.client.getPage(pageName)
        .pipe(
            map((pageData) => {
                pageData.pageContents.forEach(pageContent => this.addPageData(pageName, pageContent.contentId, pageContent.content));
            }),
            map(() => this.readPageData(pageName))
        ).pipe(
            switchMap(value => value)
        );
    }*/
}