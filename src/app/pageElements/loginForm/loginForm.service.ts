import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Credentials } from './loginForm.model';
import { User } from '../../shared/models/user';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';

@Injectable()
export class LoginService {
    constructor(private client: HttpClient, private storage: LocalStorageService) {}
    private baseAddress = "https://api.ws311471.remote.ac/user.php";

    Login(credentials: Credentials): Observable<string>
    {
        return this.client
        .post<string>(`${this.baseAddress}`, credentials, { observe: 'response'}).pipe(map((response: any) => {
            this.storage.storeToken(response.headers.get('Token'));
            this.storage.storeUser(<User>response.body.data);
            console.log(response.body.message);
            return localStorage.getItem("FirstName");
        }),
        catchError(this.handleError));
    }

    isLoggedIn()
    {
        return this.storage.currentUserIsStored();
    }

    Logout()
    {
        this.storage.removeCurrentUserData();
    }

    private handleError(error: HttpErrorResponse) {
        console.error(`Login error: ${error.error.message}`);
        return throwError('An error occurred');
    }
}
