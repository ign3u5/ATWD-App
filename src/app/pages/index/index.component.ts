import { Component } from "@angular/core";
import { AuthenticationService } from 'src/app/shared/services/authenticationService';

@Component({
    selector: 'index',
    templateUrl: './index.component.html'
})
export class IndexComponent {
    constructor(private authenticationService: AuthenticationService)
    {

    }
    get isAuthorised(): string {
        return localStorage.getItem("FirstName");
    }
test()
{
    localStorage.removeItem("Username");
}
}