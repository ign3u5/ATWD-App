import { Component } from "@angular/core";
import { Observable } from 'rxjs';
import { CMSStorageService } from 'src/app/shared/cms/cmsStorageService';
import { PageContent } from 'src/app/shared/cms/models/pageContent';
import { PageData } from 'src/app/shared/cms/models/pageData';
import { AuthenticationService } from 'src/app/shared/services/authenticationService';

@Component({
    selector: 'index',
    templateUrl: './index.component.html'
})
export class IndexComponent {

    public rightEditorContent: string;
    public leftEditorContent: string;
    public pages: PageData = [] as any;
    constructor()
    {

    }
    get isAuthorised(): string {
        return localStorage.getItem("FirstName");
    }
    test()
    {
        
    }

    workTest()
    {
        // this.pages = {aboutUs: {1: 'beans'}};
        let pageName = "aboutUs";
        this.pages[pageName] = {2: 'Hello'};
        console.log(this.pages[pageName][2]);
    }

}