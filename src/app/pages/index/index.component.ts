import { Component } from "@angular/core";
import { CMSStorageService } from 'src/app/shared/cms/cmsStorageService';
import { SetupOptions } from "src/app/shared/models/editor-init-options";
import { EditorFactoryService } from "src/app/shared/services/editor-factory/editor-factory.service";

@Component({
    selector: 'index',
    templateUrl: './index.component.html',
    styleUrls: [
        'index.component.scss'
    ]
})
export class IndexComponent {
    public pageName: string;
    public pageNameOptions: SetupOptions;
    constructor(private cmsService: CMSStorageService, private editorFactory: EditorFactoryService) {
        this.cmsService.loadPage("home").subscribe(pageName => this.pageName = pageName);
        this.pageNameOptions = editorFactory.getHeaderOptions();
    }
}