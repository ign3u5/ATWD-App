import { Component } from "@angular/core";
import { CMSStorageService } from "src/app/shared/cms/cmsStorageService";

@Component({
    selector: 'contactUs',
    templateUrl: './contactUs.component.html'
})
export class ContactUsComponent {
    public pageName: string;

    constructor(private cmsService: CMSStorageService){
        this.cmsService.loadPage("contactUs").subscribe(pageName => this.pageName = pageName);
    }
}