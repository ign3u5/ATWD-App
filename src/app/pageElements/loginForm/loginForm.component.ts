import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authenticationService';
import { LoginService } from './loginForm.service';

@Component({
    selector: 'login-form',
    templateUrl: './loginForm.component.html',
    styleUrls: ['./loginForm.component.scss', '../navbar/navbar.component.scss'],
    providers: [LoginService]
})
export class LoginFormComponent{
    loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl('')
    });
    public isVisible = false;
    public buttonName: string;
    public buttonAction: () => void;
    constructor(private loginService: LoginService, private storage: LocalStorageService, private authenticationService: AuthenticationService)
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
        this.authenticationService.toggleAuthorisation();
    }

    setToLoggedOutState()
    {
        this.buttonName = "Login";
        this.buttonAction = () => {
            this.isVisible = true;
        }
        this.authenticationService.toggleAuthorisation();
    }

    close()
    {
        this.isVisible = false;
    }

    onSubmit()
    {
        console.log("Submitted login information");
        this.loginService.Login(this.loginForm.value).subscribe(firstName => {
            alert(`Welcome ${firstName}, you are now logged in`);
            this.close();
            this.setToLoggedInState();
        });
    }
}