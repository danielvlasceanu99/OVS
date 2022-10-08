import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/models/user.model";

@Injectable({
    providedIn: "root",
})
export class UserService {
    USER_URL: string = "http://localhost:8085/api/v1/admin";

    constructor(private httpClient: HttpClient) {}

    getAllUsers() {
        return this.httpClient.get<User[]>(this.USER_URL);
    }

    getUserById(id: number): Observable<User> {
        const path = this.USER_URL + "/userID";
        return this.httpClient.get<User>(`${path}/${id}`);
    }

    insertUser(user: User): Observable<any> {
        return this.httpClient.post<any>(`${this.USER_URL}`, user);
    }

    insertAdmin(user: User): Observable<any> {
        return this.httpClient.post<any>(`${this.USER_URL}`, user);
    }

    updateUser(user: User): Observable<User> {
        return this.httpClient.put<User>(`${this.USER_URL}`, user);
    }

    deleteUser(id: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.USER_URL}/${id}`);
    }
}
