import { Component, OnInit } from "@angular/core";
import { CMSStorageService } from 'src/app/shared/cms/cmsStorageService';

@Component({
    selector: 'aboutUs',
    templateUrl: './aboutUs.component.html'
})
export class AboutUsComponent implements OnInit {

    constructor(private cmsService: CMSStorageService)
    {

    }
    ngOnInit()
    {
        this.cmsService.loadPage("aboutUs").subscribe((content) => console.log(content));
    }
}