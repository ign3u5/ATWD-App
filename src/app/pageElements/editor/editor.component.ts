import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
    private content: string;

    @Input() pageName: string;
    @Input() editorId: number;

    constructor(private cmsService: CMSStorageService) {
        this.apiKey = "t3yjki3k9abk4gc0ghgkc0yzuxr8cgm80mefx3uh1ps0u7fd";
        this.isEditor = true;
    }
    ngOnInit()
    {
        console.log("init editor");
        this.cmsService.getContent(this.pageName, this.editorId).subscribe(content => this.content = content);
        
    }

    get indicator(): string{
        return this.cmsService.indicator;
    }
    
    public save()
    {
        console.log(this.content);
    }
 }
