import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { User, UserRole } from "./models/user.model";
import { AuthentificationService } from "./services/authentification/authentification.service";
import { SessionService } from "./services/session/session.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    title = "client";
    user: User | null = null;
    isAdmin: boolean = false;

    constructor(
        public dialog: MatDialog,
        private router: Router,
        private session: SessionService,
        private cookieService: CookieService,
        private authService: AuthentificationService,
        private _snackBar: MatSnackBar
    ) {
        if (this.cookieService.get("token") && this.cookieService.get("userId")) {
            this.authService.getUserData(this.cookieService.get("userId")).subscribe({
                next: (response) => {
                    this.session.setUser(response);
                },
            });
        }
        this.session.userObservable.subscribe((user) => {
            this.user = user;
            if (this.user?.roles && this.user?.roles[0].name === UserRole.ADMIN) {
                this.isAdmin = true;
            }
        });
    }

    openAuthPage() {
        this.router.navigate(["./auth"]);
    }

    openHomePage() {
        this.router.navigate(["./**"]);
    }

    openOrdersPage() {
        this.router.navigate(["./orders"]);
    }

    logout() {
        this.authService.logout().subscribe((response) => {
            this.session.clearUser();
            this.cookieService.delete("token");
            this.cookieService.delete("userId");
            this._snackBar.open("logout successfull", "", {
                panelClass: "snack-bar-err",
                duration: 2000,
            });
            this.router.navigate(["./home"]);
        });
    }

    adminPage() {
        this.router.navigate(["./admin"]);
    }
}
