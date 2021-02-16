import { Component, OnInit } from "@angular/core";
import { interval } from 'rxjs';
import { CMSStorageService } from 'src/app/shared/cms/cmsStorageService';

@Component({
    selector: 'aboutUs',
    templateUrl: './aboutUs.component.html',
    styleUrls: ['./aboutUs.component.scss']
})
export class AboutUsComponent{

    public pageName: string;
    public buttonActive: boolean;
    public pageUpdated: boolean;
    public popupClass: string;

    constructor(private cmsService: CMSStorageService){
        this.cmsService.loadPage("aboutUs").subscribe(pageName => this.pageName = pageName);
        this.popupClass = "popup";
    }
}