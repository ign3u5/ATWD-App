import { Component } from "@angular/core";
import { CMSStorageService } from 'src/app/shared/cms/cmsStorageService';

@Component({
    selector: 'index',
    templateUrl: './index.component.html',
    styleUrls: [
        'index.component.scss'
    ]
})
export class IndexComponent {
    public pageName: string;
    constructor(private cmsService: CMSStorageService) {
        this.cmsService.loadPage("home").subscribe(pageName => this.pageName = pageName);
    }
}