import { Component } from "@angular/core";
import { CMSStorageService } from "src/app/shared/cms/cmsStorageService";

@Component({
    selector: 'services',
    templateUrl: './services.component.html'
})
export class ServicesComponent {
    public pageName: string;

    constructor(private cmsService: CMSStorageService){
        this.cmsService.loadPage("services").subscribe(pageName => this.pageName = pageName);
    }
}