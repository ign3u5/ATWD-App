import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './loginForm.service';

@Component({
    selector: 'login-form',
    templateUrl: './loginForm.component.html',
    styleUrls: ['./loginForm.component.scss'],
    providers: [LoginService]
})
export class LoginFormComponent {
    loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl('')
    });
    @Input() isVisible: boolean;
    @Output() isVisibleChange = new EventEmitter<boolean>();

    constructor(private loginService: LoginService)
    {

    }

    close()
    {
        this.isVisible = false;
        this.isVisibleChange.emit(this.isVisible);
    }

    onSubmit()
    {
        console.log("Submitted login information");
        this.loginService.Login(this.loginForm.value).subscribe(token => {
            localStorage.setItem("Token", token);
            alert("You have successfully logged in");
        });
    }
}