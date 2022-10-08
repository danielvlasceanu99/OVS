import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginResponse, LoginUser, User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  register_url: string = 'http://localhost:8085/api/v1/registration';
  login_url: string = 'http://localhost:8085/api/v1/user/login';
  constructor(private httpClient: HttpClient) {}

  register(user: User): Observable<any> {
    return this.httpClient.post<any>(this.register_url, user);
  }

  login(user: LoginUser): Observable<LoginResponse> {
    console.log(user);
    return this.httpClient.post<LoginResponse>(this.login_url, user);
  }

  getUserData(userId: any): Observable<User> {
    return this.httpClient.get<User>(
      `http://localhost:8085/api/v1/admin/userID/${userId}`
    );
  }

  logout(): Observable<null> {
    return of(null);
  }
}
