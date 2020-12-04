import { Component } from '@angular/core';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        './navbar.component.scss'
    ]
})
export class NavbarComponent {
    public pages: Pages[];
    public loginIsActive = false;
    constructor(){
        this.pages = [
            { name: "Contact Us", link: "contactUs"},
            { name: "Gallery", link: "gallery"},
            { name: "Services", link: "services"},
            { name: "About Us", link: "aboutUs"},
            { name: "Home", link: "home"},
        ];
    }
    activateLogin()
    {
        this.loginIsActive = true;
    }
}
class Pages{
    name: string;
    link: string;
}
