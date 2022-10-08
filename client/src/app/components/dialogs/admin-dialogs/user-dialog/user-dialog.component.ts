import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "src/app/services/user-service/user.service";

@Component({
    selector: "app-user-dialog",
    templateUrl: "./user-dialog.component.html",
    styleUrls: ["./user-dialog.component.scss"],
})
export class UserDialogComponent implements OnInit {
    constructor(
        private userService: UserService,
        private _snackBar: MatSnackBar,
        private dialogRef: MatDialogRef<UserDialogComponent>
    ) {}
    registerGroup = new FormGroup({
        passwordFormControl: new FormControl("", [
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
    get emailFormCtrl(): AbstractControl | null {
        return this.registerGroup.get("emailFormControl");
    }

    get passwordFormControl(): AbstractControl | null {
        return this.registerGroup.get("passwordFormControl");
    }

    get confirmPasswordFormCtrl(): AbstractControl | null {
        return this.registerGroup.get("confirmPasswordFormControl");
    }

    passwordMatch(): boolean {
        return this.passwordFormControl?.value === this.confirmPasswordFormCtrl?.value;
    }

    ngOnInit(): void {}

    addUser() {
        this.userService
            .insertAdmin({ email: this.emailFormCtrl?.value, password: this.passwordFormControl?.value })
            .subscribe({
                next: (response) => {
                    this.dialogRef.close(response);
                },
            });
    }
}
