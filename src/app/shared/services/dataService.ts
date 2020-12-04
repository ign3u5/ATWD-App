import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from '../models/user';

@Injectable()
export class DataService {
    constructor(private client: HttpClient) { }
    private token: string;
    private tokenExpiration: string;

    getToken(): string {
        return this.token;
    }
    login(creds): Observable<boolean> {
        return this.client
            .post('http://localhost/ATWD/backend/api/login.php', creds)
            .pipe(map((data: any) => {
                this.token = data.token;
                this.tokenExpiration = data.expiration;
                return true;
            }));
    }
}