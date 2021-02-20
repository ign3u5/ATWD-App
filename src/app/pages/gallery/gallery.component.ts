import { Component } from "@angular/core";
import { NavigationStart } from '@angular/router';
import { CMSStorageService } from "src/app/shared/cms/cmsStorageService";
import { SetupOptions } from "src/app/shared/models/editor-init-options";
import { EditorType } from "src/app/shared/models/editor-type";
import { EditorFactoryService } from "src/app/shared/services/editor-factory/editor-factory.service";

@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: [
        'gallery.component.scss'
    ]
})
export class GalleryComponent {
    public pageName: string;
    public captionOptionsType: EditorType;

    constructor(private cmsService: CMSStorageService, private editorFactory: EditorFactoryService){
        this.cmsService.loadPage("gallery").subscribe(pageName => this.pageName = pageName);
        this.captionOptionsType = EditorType.SubTitle;
    }
}