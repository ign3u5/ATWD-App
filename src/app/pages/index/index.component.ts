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
    private pageName = "aboutUs";
    public pageName$: Observable<string>;
    public editorPageName: string;

    constructor(private cmsService: CMSStorageService){
        if (this.cmsService.pageData[this.pageName])
        {
            console.log("Memory contains page data, pulling content from there");
            this.pageName$ = new Observable<string>(observer => 
                observer.next(this.pageName));
        }
        else
        {
            console.log("Memory does not contain page data, setting page name observable to wait for API to return data to memory.");
            this.pageName$ = this.cmsService.loadPage(this.pageName).pipe(
                map(() => this.pageName)
            );
        }
        this.pageName$.subscribe(pageName => this.editorPageName = pageName);
    }

    get isAuthorised(): string {
        return localStorage.getItem("FirstName");
    }
    test()
    {
        
    }


}