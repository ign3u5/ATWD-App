import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { CMSStorageService } from "src/app/shared/cms/cmsStorageService";

@Component({
    selector: 'contactUs',
    templateUrl: './contactUs.component.html',
    styleUrls: ['./contactUs.component.scss']
})
export class ContactUsComponent {
    public pageName: string;
    public contactForm = this.formBuilder.group({
        name: ['', Validators.required],
        company: [''],
        email: ['', [Validators.required, Validators.email]],
        message: ['', Validators.required],
    });

    constructor(private cmsService: CMSStorageService, private formBuilder: FormBuilder){
        this.cmsService.loadPage("contactUs").subscribe(pageName => this.pageName = pageName);
    }


    public onSubmit()
    {
        console.log(`Hello ${this.contactForm.value[`name`]}`);
        console.log(`Current form status ${this.contactForm.status}`);
    }
}