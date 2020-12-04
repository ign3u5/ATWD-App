import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';


@Injectable()
export class AuthenticationService
{
    public isAuthorised: boolean;
    authorisationChange: Subject<boolean> = new Subject<boolean>();

    constructor() {
        this.authorisationChange.subscribe({next: (value) => 
            this.isAuthorised = value
        });
    }

    toggleAuthorisation() {
        this.authorisationChange.next(!this.isAuthorised);
    }
}