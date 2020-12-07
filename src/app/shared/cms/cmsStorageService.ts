import { Dexie } from 'dexie';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { PageData } from './models/pageData';
import { PageContent } from './models/pageContent';


@Injectable()
export class CMSStorageService
{
    private skylabdb: any;
    public pages: PageData[];

    public constructor()
    {
        this.makeDatabase();
        this.connectToDatabase();
    }

    makeDatabase(): void {
        this.skylabdb = new Dexie('skylabdb');
        this.skylabdb.version(1).stores({
            pages: `pageName, contentId, content`
        });
    }

    connectToDatabase(): void {
        this.skylabdb.open().catch((error) => {
            alert(`Error connecting to database: ${error}`);
        });
    }

    addPage(page: PageData)
    {
        console.log(page);
        page.pageContents.forEach(pageContent => {
            this.addEntry(page.pageName, pageContent);
        });
    }

    addEntry(pageName: string, pageContent: PageContent)
    {
        this.skylabdb.pages.add({
            pageName: pageName,
            contentId: pageContent.contentId,
            content: pageContent.content
        });
    }

    loadPage(pageName: string): PageData{
        let pageContents: PageContent[];
        this.skylabdb.pages.where('pageName').equalsIgnoreCase(pageName).each((pageContent) =>
        {
            pageContents.push({
                contentId: pageContent.contentId,
                content: pageContent.content
            });
        });
        return {
            pageName: pageName, 
            pageContents: pageContents
        };
    }

    test()
    {
       this.addEntry("aboutUs", {contentId: 1, content: "Welcome"});
       this.addEntry("home", {contentId: 1, content: "Beans"});
       alert(this.loadPage("aboutUs").pageName);
    }
}