import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { observable, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CMSStorageService } from 'src/app/shared/cms/cmsStorageService';
import { EditorButton } from 'src/app/shared/models/editor-button';
import { InitOptions, SetupOptions } from 'src/app/shared/models/editor-init-options';
import { EditorType } from 'src/app/shared/models/editor-type';
import { EditorFactoryService } from 'src/app/shared/services/editor-factory/editor-factory.service';
import { TokenService } from 'src/app/shared/services/token-service/token-service.service';

@Component({
	selector: 'editorc',
    templateUrl: 'editor.component.html',
    styleUrls: [
        './editor.component.scss'
    ]
})
export class EditorComponent implements OnInit, OnChanges{
    public apiKey: string;
    public content: string;
    public initOptions: SetupOptions;
    public get isEditable(): boolean {
        return this.tokenService.TokenIsValid;
    }

    @Input() optionsType: EditorType;
    @Input() editorId: number;
    @Input() pageName: string;
    @Output() contentUpdate = new EventEmitter<string>();

    constructor(private cmsService: CMSStorageService, private tokenService: TokenService, private editorFactory: EditorFactoryService) {
        this.apiKey = "t3yjki3k9abk4gc0ghgkc0yzuxr8cgm80mefx3uh1ps0u7fd";
    }

    ngOnInit()
    {
        this.initOptions = this.editorFactory.getSetupOptionsFromType(this.optionsType);
        let button = new EditorButton("Save");
        button.onAction = () => {
            this.updateContent();
        }
        this.initOptions.toolbar = "save";
        this.initOptions.setup = (editor) => {
            editor.ui.registry.addButton("save", button);
        }
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
        if (this.isEditable)
        {
            this.cmsService.pageData[this.pageName][this.editorId] = this.content;
            console.log(`Set local store for ${this.pageName} ${this.editorId} to ${this.content}`);
        }
        this.cmsService.updatePage(this.pageName).subscribe(() => {
            console.log(`${this.content} was saved for ${this.pageName}`);
        });
        this.contentUpdate.emit(this.content);
    }
 }
