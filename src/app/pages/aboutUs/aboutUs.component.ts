import { Component, OnInit } from "@angular/core";
import { CMSStorageService } from 'src/app/shared/cms/cmsStorageService';

@Component({
    selector: 'aboutUs',
    templateUrl: './aboutUs.component.html'
})
export class AboutUsComponent{

    constructor(private cmsService: CMSStorageService)
    {

    }

}