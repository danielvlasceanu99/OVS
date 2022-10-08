import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User, UserRole } from '../models/user.model';
import { SessionService } from '../services/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: User | null = null;
  constructor(private sessionService: SessionService, private router: Router) {
    this.sessionService.userObservable.subscribe((user) => {
      this.user = user;
    });
   }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserifAdmin(this.user);
  }


  checkUserifAdmin(user: User | null): boolean {
    if (this.user?.roles && this.user?.roles[0].name === UserRole.ADMIN) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
  
}
