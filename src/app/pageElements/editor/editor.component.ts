import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { observable, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CMSStorageService } from 'src/app/shared/cms/cmsStorageService';

@Component({
	selector: 'editorc',
    templateUrl: 'editor.component.html',
    styleUrls: [
        './editor.component.scss'
    ]
})
export class EditorComponent implements OnInit{
    public isEditor: boolean;
    public apiKey: string;
    public content: string;
    public content$: Observable<string>;

    @Input() pageName: string;
    @Input() editorId: number;

    constructor(private cmsService: CMSStorageService) {
        this.apiKey = "t3yjki3k9abk4gc0ghgkc0yzuxr8cgm80mefx3uh1ps0u7fd";
        this.isEditor = true;

    }
    ngOnInit()
    {
        if (this.cmsService.pageData[this.pageName])
        {
            console.log("Memory contains page data, pulling content from there");
            this.content$ = new Observable<string>(observer => 
                observer.next(this.cmsService.pageData[this.pageName][this.editorId]));
            this.content$.subscribe((value) => console.log("After"));
        }
        else
        {
            console.log("Memory does not contain page data, setting content observable to call get page");
            this.content$ = this.cmsService.loadPage(this.pageName).pipe(
                map(() => {
                    console.log(`Page content: ${JSON.stringify(this.cmsService.pageData)}`);
                    return this.cmsService.pageData[this.pageName][this.editorId]})
            );
        }
        this.content$.subscribe(content => {
            console.log(`Content is being set to ${content}`);
            this.content = content});
        console.log("init editor");
    }

    
    public save()
    {
    }
 }
