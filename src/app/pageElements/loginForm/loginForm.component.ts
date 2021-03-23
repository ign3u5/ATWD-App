import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authenticationService';
import { HttpDataService } from 'src/app/shared/services/httpDataService';
import { StorageService } from 'src/app/shared/services/storageService';
import { TokenService } from "src/app/shared/services/token-service/token-service.service";

@Component({
    selector: 'login-form',
    templateUrl: './loginForm.component.html',
    styleUrls: ['./loginForm.component.scss', '../navbar/navbar.component.scss', '../../shared/styles/form.scss']
})
export class LoginFormComponent{
    loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl('')
    });

    @Input() showMobileMenu: boolean;
    @Output() StatusChange = new EventEmitter();

    public isVisible = false;
    public buttonName: string;
    public buttonAction: () => void;
    constructor(private client: HttpDataService, private storage: StorageService, private tokenService: TokenService)
    {
        if (tokenService.TokenIsValid)
        {
            this.setToLoggedInState();
        }
        else
        {
            this.setToLoggedOutState();
        }
    }

    setToLoggedInState()
    {
        this.buttonName = "Logout";
        this.buttonAction = () => {
            console.log("Logging out");
            this.storage.removeCurrentUserData();
            this.setToLoggedOutState();
            this.tokenService.checkToken();
        }
        this.StatusChange.emit();
    }

    setToLoggedOutState()
    {
        this.buttonName = "Login";
        this.buttonAction = () => {
            this.isVisible = true;
        }
        this.StatusChange.emit();
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
            this.tokenService.checkToken();
            this.StatusChange.emit();
        });
    }
}