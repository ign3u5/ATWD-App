import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { observable, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CMSStorageService } from 'src/app/shared/cms/cmsStorageService';
import { InitOptions } from 'src/app/shared/models/editor-init-options';

@Component({
	selector: 'editorc',
    templateUrl: 'editor.component.html',
    styleUrls: [
        './editor.component.scss'
    ]
})
export class EditorComponent{
    public apiKey: string;
    public content$: Observable<string>;

    @Input() initOptions: InitOptions;
    @Input() editorId: number;
    @Input() content: string;
    @Input() isEditable: boolean;
    @Output() contentUpdate = new EventEmitter<string>();

    constructor(private cmsService: CMSStorageService) {
        this.apiKey = "t3yjki3k9abk4gc0ghgkc0yzuxr8cgm80mefx3uh1ps0u7fd";
    }

    updateContent()
    {
        this.contentUpdate.emit(this.content);
    }
 }
