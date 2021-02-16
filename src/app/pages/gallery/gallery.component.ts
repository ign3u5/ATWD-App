import { Component } from "@angular/core";
import { NavigationStart } from '@angular/router';
import { CMSStorageService } from "src/app/shared/cms/cmsStorageService";

@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html'
})
export class GalleryComponent {
    public pageName: string;

    constructor(private cmsService: CMSStorageService){
        this.cmsService.loadPage("gallery").subscribe(pageName => this.pageName = pageName);
    }
}