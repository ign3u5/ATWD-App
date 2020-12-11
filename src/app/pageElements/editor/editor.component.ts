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
export class EditorComponent implements OnChanges{
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
    ngOnChanges()
    {
        if (this.cmsService.pageData[this.pageName])
        {
            this.content = this.cmsService.pageData[this.pageName][this.editorId];
        }
        else if(this.pageName)
        {
            console.error(`Failed to load page data from memory in editor component. Check that content for ${this.editorId} is being set in ${this.pageName} component`);
        }
    }

    updateContent()
    {
        if (this.isEditor)
        {
            this.cmsService.pageData[this.pageName][this.editorId] = this.content;
        }
    }
 }
