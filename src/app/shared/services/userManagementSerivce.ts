import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class UserManagementService {
    constructor(private client: HttpClient) {}
    private baseAddress = "localhost/user";
    GetUserById(userId: string): Observable<User>
    {
        return this.client
        .get<User>(`${this.baseAddress}/${userId}`);
    }
}