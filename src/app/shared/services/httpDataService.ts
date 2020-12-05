import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Credentials } from '../models/credentials';
import { User } from '../models/user';
import { StorageService } from './storageService';

@Injectable()
export class HttpDataService {
    constructor(private client: HttpClient, private storageService: StorageService) {}
    private baseAddress = 'https://api.ws311471.remote.ac/';

    login(credentials: Credentials): Observable<void>
    {
        return this.client
        .post<void>(`${this.baseAddress}user.php`, credentials, { observe: 'response'})
        .pipe(
            map((response: any) => {
                this.storageService.Token = response.headers.get('Token');
                this.storageService.CurrentUser = response.body.data as User;
                console.log(response.body.message);
            }),
            catchError(this.handleError)
        );
    }

    deleteCurrentUser(): Observable<void>
    {
        return this.client
        .delete<void>(`${this.baseAddress}user.php`, {headers: this.setTokenHeader()})
        .pipe(
            map((responseBody: any) => {
                console.log(responseBody.message);
            }),
        catchError(this.handleError));
    }

    getUser(username: string): Observable<User>
    {
        return this.client
        .get<User>(`${this.baseAddress}users.php`, 
        {headers: this.setTokenHeader(), observe: 'response', params: this.setParamsWithUsername(username)})
        .pipe(
            map((response: any) => {
                this.storageService.Token = response.headers.get('Token');
                console.log(response.body.message);
                return response.body.data as User;
            }),
            catchError(this.handleError)
       );
    }

    getAllUsers(): Observable<User[]>
    {
        return this.client
        .get<User[]>(`${this.baseAddress}users.php`, {headers: this.setTokenHeader(), observe: 'response'})
        .pipe(
            map((response: any) => {
                this.storageService.Token = response.headers.get('Token');
                console.log(response.body.message);
                return response.body.data as User[];
            }),
            catchError(this.handleError)
        );
    }

    updateUser(user: User): Observable<void>
    {
        return this.client
        .put<void>(`${this.baseAddress}users.php`, user, {headers: this.setTokenHeader(), observe: 'response'})
        .pipe(
            map((response: any) => {
                this.storageService.Token = response.headers.get('Token');
                console.log(response.body.message);
            }),
            catchError(this.handleError)
        );
    }

    createNewUser(user: User): Observable<void>
    {
        return this.client
        .post<void>(`${this.baseAddress}users.php`, user, {headers: this.setTokenHeader(), observe: 'response'})
        .pipe(
            map((response: any) => {
                this.storageService.Token = response.headers.get('Token');
                console.log(response.body.message);
            }),
            catchError(this.handleError)
        );
    }

    deleteUser(username: string): Observable<void>
    {
        return this.client
        .delete<void>(`${this.baseAddress}users.php`,
        {headers: this.setTokenHeader(), observe: 'response', params: this.setParamsWithUsername(username)})
        .pipe(
            map((response: any) => {
                this.storageService.Token = response.headers.get('Token');
                console.log(response.body.message);
            }),
            catchError(this.handleError)
        );
    }

    private setTokenHeader(): HttpHeaders {
        return new HttpHeaders({Token: this.storageService.Token});
    }

    private setParamsWithUsername(username: string): HttpParams {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('username', username);
        return httpParams;
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        console.error(`Login error: ${error.error.message}`);
        return throwError('An error occurred');
    }
}