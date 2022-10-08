import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private user: User | null = null;
  private userSubject: BehaviorSubject<any> = new BehaviorSubject(null); //todo read about Subjects, BehaviorSubject from rxjs
  userObservable = this.userSubject.asObservable();
  constructor() {}

  setUser(user: User) {
    this.user = user;
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.user;
  }

  clearUser() {
    this.user = null;
    this.userSubject.next(null);
  }
}
