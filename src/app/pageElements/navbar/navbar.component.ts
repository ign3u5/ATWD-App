import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token-service/token-service.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        './navbar.component.scss'
    ]
})
export class NavbarComponent {
    public pages: Page[];
    public authActionName = "Login";
    constructor(private tokenService: TokenService, private route: Router){
        this.pages = [
            new Page("Admin", "admin", tokenService.UserIsAdmin),
            new Page("Contact Us", "contactUs"),
            new Page("Gallery", "gallery"),
            new Page("Services", "services"),
            new Page("About Us", "aboutUs"),
            new Page("Home", "home"),
        ];
    }

    changeLoggedInState()
    {
        this.pages[0].enabled = this.tokenService.UserIsAdmin;
        if (!this.tokenService.UserIsAdmin)
        {
            if (this.route.url == '/admin')
            {
                this.route.navigateByUrl('/home');
            }
        }
    }
}
class Page {
    constructor(public name: string, public link: string, public enabled: boolean = true) {
        console.log(`Page name: ${name}. Enabled: ${enabled}`);
     }
}
