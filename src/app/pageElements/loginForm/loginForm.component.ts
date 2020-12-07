import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authenticationService';
import { HttpDataService } from 'src/app/shared/services/httpDataService';
import { StorageService } from 'src/app/shared/services/storageService';

@Component({
    selector: 'login-form',
    templateUrl: './loginForm.component.html',
    styleUrls: ['./loginForm.component.scss', '../navbar/navbar.component.scss']
})
export class LoginFormComponent{
    loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl('')
    });
    public isVisible = false;
    public buttonName: string;
    public buttonAction: () => void;
    constructor(private client: HttpDataService, private storage: StorageService)
    {
        if (this.storage.currentUserIsStored())
            this.setToLoggedInState();
        else
            this.setToLoggedOutState();
    }

    setToLoggedInState()
    {
        this.buttonName = "Logout";
        this.buttonAction = () => {
            console.log("Logging out");
            this.storage.removeCurrentUserData();
            this.setToLoggedOutState();
        }
    }

    setToLoggedOutState()
    {
        this.buttonName = "Login";
        this.buttonAction = () => {
            this.isVisible = true;
        }
    }

    close()
    {
        this.isVisible = false;
    }

    onSubmit()
    {
        console.log("Submitted login information");
        this.client.login(this.loginForm.value).subscribe(() => {
            alert(`Welcome ${this.storage.CurrentUser.firstName}, you are now logged in`);
            this.close();
            this.setToLoggedInState();
        });
    }
}