import { Component } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CMSStorageService } from 'src/app/shared/cms/cmsStorageService';
import { PageContent } from 'src/app/shared/cms/models/pageContent';
import { PageData } from 'src/app/shared/cms/models/pageData';
import { AuthenticationService } from 'src/app/shared/services/authenticationService';

@Component({
    selector: 'index',
    templateUrl: './index.component.html'
})
export class IndexComponent {
    public pageName: string;

    constructor(private cmsService: CMSStorageService){
        this.cmsService.loadPage("aboutUs").subscribe(pageName => this.pageName = pageName);
    }

    get isAuthorised(): string {
        return localStorage.getItem("FirstName");
    }
    test()
    {
        
    }


}