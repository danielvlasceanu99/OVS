import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthentificationService } from "src/app/services/authentification/authentification.service";
import { CookieService } from "ngx-cookie-service";
import { SessionService } from "src/app/services/session/session.service";
import { LoginUser, User } from "src/app/models/user.model";
import { Router } from "@angular/router";
import { CustomValidators } from "../../shared/custom-validators";
import { MatSnackBar } from "@angular/material/snack-bar";
//import { ValidatorFn } from '@angular/forms';

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
    formGroup = new FormGroup({
        usernameFormControl: new FormControl("", [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(100),
        ]),
        passwordFormControl: new FormControl("", [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(60),
        ]),
    });
    registerGroup = new FormGroup({
        firstNameFormControl: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100),
            Validators.pattern("[a-zA-Z ]*"),
        ]),
        lastNameFormControl: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100),
            Validators.pattern("[a-zA-Z ]*"),
        ]),
        passwordRFormControl: new FormControl("", [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(60),
            Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"),
        ]),
        emailFormControl: new FormControl("", [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(80),
            Validators.email,
        ]),
        confirmPasswordFormControl: new FormControl("", [Validators.required]),
    });
    constructor(
        private authService: AuthentificationService,
        private cookieService: CookieService,
        private session: SessionService,
        private router: Router,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {}

    get usernameCtrl(): AbstractControl | null {
        return this.formGroup.get("usernameFormControl");
    }

    get passwordCtrl(): AbstractControl | null {
        return this.formGroup.get("passwordFormControl");
    }

    get firstNameCtrl(): AbstractControl | null {
        return this.registerGroup.get("firstNameFormControl");
    }

    get lastNameCtrl(): AbstractControl | null {
        return this.registerGroup.get("lastNameFormControl");
    }

    get passwordRFormCtrl(): AbstractControl | null {
        return this.registerGroup.get("passwordRFormControl");
    }

    get emailFormCtrl(): AbstractControl | null {
        return this.registerGroup.get("emailFormControl");
    }

    get confirmPasswordFormCtrl(): AbstractControl | null {
        return this.registerGroup.get("confirmPasswordFormControl");
    }

    passwordMatch(): boolean {
        return this.passwordRFormCtrl?.value === this.confirmPasswordFormCtrl?.value;
    }

    login() {
        const user: LoginUser = {
            username: this.usernameCtrl?.value,
            password: this.passwordCtrl?.value,
        };

        this.authService.login(user).subscribe({
            next: (resp) => {
                this.cookieService.set("token", resp.jwt); // should be secure
                this.cookieService.set("userId", JSON.stringify(resp.id));
                this.authService.getUserData(resp.id).subscribe({
                    next: (response) => {
                        this.session.setUser(response);
                        this.router.navigate(["/home"]);
                    },
                    error: (err) => {
                        this._snackBar.open("Error getting user data", "", {
                            duration: 4000,
                        });
                    },
                });
            },
            error: (err: any) => {
                this._snackBar.open("Error logging in", "", {
                    duration: 4000,
                });
            },
        });
    }

    register() {
        const user: User = {
            firstName: this.firstNameCtrl?.value,
            lastName: this.lastNameCtrl?.value,
            email: this.emailFormCtrl?.value,
            password: this.passwordRFormCtrl?.value,
        };

        this.authService.register(user).subscribe((resp) => {
            console.log(resp);
            if (resp.responseBody == "ok") {
                this._snackBar.open("User created successfully, please check your email to validate the account", "", {
                    duration: 4000,
                });
                this.router.navigate(["/home"]);
            } else {
                this._snackBar.open("Error creating user", "", {
                    duration: 4000,
                });
            }
        });
    }
}
