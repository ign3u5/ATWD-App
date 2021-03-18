export class ContactFormData implements IContactFormData
{
    name: string;
    company?: string;
    email: string;
    message: string;
    constructor(formData: IContactFormData) {
    this.name = formData.name;
    this.email = formData.email;
    this.message = formData.message;
        if (formData.company)
        {
            this.company = formData.company;
        }
    }
}

export interface IContactFormData
{
    name: string;
    company?: string;
    email: string;
    message: string;
}