import { Component } from "@angular/core";
import { Observable } from 'rxjs';
import { CMSStorageService } from 'src/app/shared/cms/cmsStorageService';
import { AuthenticationService } from 'src/app/shared/services/authenticationService';

@Component({
    selector: 'index',
    templateUrl: './index.component.html'
})
export class IndexComponent {

    public rightEditorContent: string;
    public leftEditorContent: string;
    constructor(private authenticationService: AuthenticationService, private cmsService: CMSStorageService)
    {
    }
    get isAuthorised(): string {
        return localStorage.getItem("FirstName");
    }
    test()
    {

    }

}