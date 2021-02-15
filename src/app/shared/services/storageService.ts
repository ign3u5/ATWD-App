import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class StorageService
{
    removeCurrentUserData(): void
    {
        localStorage.removeItem('Username');
        localStorage.removeItem('FirstName');
        localStorage.removeItem('LastName');
        localStorage.removeItem('Email');
        localStorage.removeItem('PrivilegeLevel');
        localStorage.removeItem('Token');
        console.log("Any locally stored user data has been cleared");
    }

    currentUserIsStored(): boolean
    {
        if (localStorage.getItem('Username') &&
            localStorage.getItem('FirstName') &&
            localStorage.getItem('LastName') &&
            localStorage.getItem('Email') &&
            localStorage.getItem('PrivilegeLevel') &&
            localStorage.getItem('Token')) {
            return true;
        }
        return false;
    }
    set CurrentUser(currentUser: User)
    {
        localStorage.setItem('Username', currentUser.username);
        localStorage.setItem('FirstName', currentUser.firstName);
        localStorage.setItem('LastName', currentUser.lastName);
        localStorage.setItem('Email', currentUser.email);
        localStorage.setItem('PrivilegeLevel', currentUser.privilegeLevel.toString());
    }
    get CurrentUser(): User
    {
        return {
            username: localStorage.getItem('Username'),
            firstName: localStorage.getItem('FirstName'),
            lastName: localStorage.getItem('LastName'),
            email: localStorage.getItem('Email'),
            privilegeLevel: Number.parseInt(localStorage.getItem('PrivilegeLevel'), 10)
        }
    }

    set Token(token: string)
    {
        localStorage.setItem('Token', token);
    }
    get Token(): string
    {
        return localStorage.getItem('Token');

    }
}