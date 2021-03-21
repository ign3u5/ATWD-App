import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { CMSStorageService } from "src/app/shared/cms/cmsStorageService";
import { ContactFormData } from "src/app/shared/models/contact-form-data";
import { HttpDataService } from "src/app/shared/services/httpDataService";

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

    constructor(private cmsService: CMSStorageService, private formBuilder: FormBuilder, private httpClient: HttpDataService){
        this.cmsService.loadPage("contactUs").subscribe(pageName => this.pageName = pageName);
    }


    public onSubmit()
    {
        var contactFormData = new ContactFormData(this.contactForm.value);

        console.groupCollapsed(`Contact Form Submission`);
            console.log(`Name: ${contactFormData.name}`);
            console.log(`Company: ${contactFormData.company}`);
            console.log(`Email: ${contactFormData.email}`);
            console.log(`Message: ${contactFormData.message}`);
            console.log(`Current form status: ${this.contactForm.status}`);
        console.groupEnd();

        this.httpClient
            .submitContactForm(contactFormData)
            .subscribe(() => {
                alert(`Thanks ${contactFormData.name}, your message has been successfully sent! Someone will return the message shortly.`);
                this.contactForm.reset();
            });
    }
}