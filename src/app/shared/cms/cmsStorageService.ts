import { Dexie } from 'dexie';
import "dexie-observable";
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { PageData } from './models/pageData';
import { PageContent } from './models/pageContent';
import { from, Observable } from 'rxjs';
import { HttpDataService } from '../services/httpDataService';
import { map, switchMap, tap } from 'rxjs/operators';


@Injectable()
export class CMSStorageService
{
    private db: any;
    private dbName: string;

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
    }

    private addPageData(pageName: string, contentId: number, content: string): Observable<void>
    {
        return from(this.db.pages
            .add({pageName: pageName, contentId: contentId, content: content})
            .catch('ConstraintError', (error) => {
                console.log("Attempted to add a value that already exists");
            }) as Promise<void>);
    }

    private readPageData(pageName: string): Observable<string>
    {
        return from(this.db.pages.where("[pageName+contentId]").between([pageName, Dexie.minKey], [pageName, Dexie.maxKey]).first((pageData) => {
            return pageData.content;
        }) as Promise<string>);
    }
}