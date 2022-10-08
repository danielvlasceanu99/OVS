import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-reserve-dialog",
    templateUrl: "./reserve-dialog.component.html",
    styleUrls: ["./reserve-dialog.component.scss"],
})
export class ReserveDialogComponent implements OnInit {
    reserveFromGroup = new FormGroup({
        firstName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        lastName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        email: new FormControl("", [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            Validators.email,
        ]),
    });

    get firstName(): AbstractControl | null {
        return this.reserveFromGroup.get("firstName");
    }
    get lastName(): AbstractControl | null {
        return this.reserveFromGroup.get("lastName");
    }
    get email(): AbstractControl | null {
        return this.reserveFromGroup.get("email");
    }
    constructor(private dialogRef: MatDialogRef<ReserveDialogComponent>) {}

    ngOnInit(): void {}

    reserve() {
        this.dialogRef.close("Success");
    }
}
