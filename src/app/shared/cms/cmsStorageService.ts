import { Collection, Dexie } from 'dexie';
import "dexie-observable";
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
            map(() => this.readAllPageData())
        ).pipe(
            switchMap(value => value)
        ).pipe(
            map(() => {
                console.log("Pages finished adding to memory");
                this.loadedPages.next(this.pages);
            })
        )
    }
    
    private addPageData(page: PageDataContent): Observable<void>
    {
        return from(this.db.pages
            .add({pageName: page.pageName, contentId: page.contentId, content: page.content})
            .catch('ConstraintError', (_error) => {
                console.log("Attempted to add a value that already exists");
            }) as Promise<void>);
    }

    private readAllPageData(): Observable<void>
    {
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
                return this.pages.find(page => page.pageName == pageName && page.contentId == contentId).content
            }));
    }

    public updateContent(pageName: string, contentId: number, content: string): void
    {
        
    }
}