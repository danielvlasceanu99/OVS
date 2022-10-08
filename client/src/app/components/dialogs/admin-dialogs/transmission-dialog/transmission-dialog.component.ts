import { Component, Inject, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Transmission } from "src/app/models/transmission.model";
import { TransmissionService } from "src/app/services/transmission-service/transmission.service";

@Component({
    selector: "app-transmission-dialog",
    templateUrl: "./transmission-dialog.component.html",
    styleUrls: ["./transmission-dialog.component.scss"],
})
export class TransmissionDialogComponent implements OnInit {
    transmission: Transmission | null = null;

    transmissionFormGroup = new FormGroup({
        numberOfGears: new FormControl(this.data?.transmission?.numberOfGears, [
            Validators.required,
            Validators.min(1),
            Validators.max(15),
        ]),
        transmissionType: new FormControl(this.data?.transmission?.transmissionType, [Validators.required]),
    });

    get numberOfGears(): AbstractControl | null {
        return this.transmissionFormGroup.get("numberOfGears");
    }
    get transmissionType(): AbstractControl | null {
        return this.transmissionFormGroup.get("transmissionType");
    }

    constructor(
        private _snackBar: MatSnackBar,
        private dialogRef: MatDialogRef<TransmissionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { transmission: Transmission },
        private transmissionService: TransmissionService
    ) {
        if (data) {
            this.transmission = this.data.transmission;
        }
    }

    ngOnInit(): void {}

    addTransmission() {
        this.transmission = {
            id: 0,
            numberOfGears: this.numberOfGears?.value,
            transmissionType: this.transmissionType?.value,
        };

        this.transmissionService.insertTransmission(this.transmission).subscribe({
            next: (response) => {
                this.dialogRef.close(response.responseBody);
            },
        });
    }
    editTransmission() {
        this.transmission = {
            id: this.data.transmission.id,
            numberOfGears: this.numberOfGears?.value,
            transmissionType: this.transmissionType?.value,
        };

        this.transmissionService.updateTransmission(this.transmission).subscribe({
            next: (response) => {
                this.dialogRef.close(response.responseBody);
            },
        });
    }
}
