import { Injectable } from "@angular/core";
import { User } from '../models/user';
import { Dexie } from 'dexie';

@Injectable()
export class LocalStorageService
{
    private skylabdb: Dexie
    constructor() {
        this.skylabdb = new Dexie('skylabdb');
        this.skylabdb.version(1).stores({
            pages: `pageName, contentId, content`
        });
    }

    storePages()
    {

    }

    removeCurrentUserData()
    {
        localStorage.removeItem("Username");
        localStorage.removeItem("FirstName");
        localStorage.removeItem("LastName");
        localStorage.removeItem("Email");
        localStorage.removeItem("Token");
    }

    currentUserIsStored(): boolean
    {
        if (localStorage.getItem("Username") &&
            localStorage.getItem("FirstName") &&
            localStorage.getItem("LastName") &&
            localStorage.getItem("Email") &&
            localStorage.getItem("Token"))
            return true;
        return false;
    }

    storeUser(currentUser: User)
    {
        localStorage.setItem("Username", currentUser.username);
        localStorage.setItem("FirstName", currentUser.firstName);
        localStorage.setItem("LastName", currentUser.lastName);
        localStorage.setItem("Email", currentUser.email);
    }

    storeToken(token: string)
    {
        localStorage.setItem("Token", token);
    }
}