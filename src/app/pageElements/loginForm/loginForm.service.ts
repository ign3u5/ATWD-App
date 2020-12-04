import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Credentials } from './loginForm.model';

@Injectable()
export class LoginService {
    constructor(private client: HttpClient) {}
    private baseAddress = "https://api.ws311471.remote.ac/user.php";

    Login(credentials: Credentials): Observable<string>
    {
        return this.client
        .post<string>(`${this.baseAddress}`, credentials).pipe(map((data: any) => {
            console.log(data.message);
            return data.data;
        }),
        catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.error(`Login error: ${error.error.message}`);
        return throwError('An error occurred');
    }
}
