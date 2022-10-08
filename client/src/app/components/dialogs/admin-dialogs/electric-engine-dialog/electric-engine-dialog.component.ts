import { Component, Inject, OnInit } from "@angular/core";
import { ElectricEngineService } from "src/app/services/electric-engine-service/electric-engine.service";
import { ElectricEngine } from "src/app/models/electric-engine.model";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: "app-electric-engine-dialog",
    templateUrl: "./electric-engine-dialog.component.html",
    styleUrls: ["./electric-engine-dialog.component.scss"],
})
export class ElectricEngineDialogComponent implements OnInit {
    formGroup: FormGroup = new FormGroup({
        batteryCapacity: new FormControl(this.data?.electricEngine?.batteryCapacity, [
            Validators.required,
            Validators.min(17),
            Validators.max(100),
        ]),
        motorRange: new FormControl(this.data?.electricEngine?.motor_range, [
            Validators.required,
            Validators.min(135),
            Validators.max(800),
        ]),
        type: new FormControl(this.data?.electricEngine?.type, [Validators.required]),
    });

    get type(): AbstractControl | null {
        return this.formGroup.get("type");
    }

    get batteryCapacity(): AbstractControl | null {
        return this.formGroup.get("batteryCapacity");
    }

    get motorRange(): AbstractControl | null {
        return this.formGroup.get("motorRange");
    }

    electricEngine: ElectricEngine | null = null;

    constructor(
        private electricEngineService: ElectricEngineService,
        private dialogRef: MatDialogRef<ElectricEngineDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { electricEngine: ElectricEngine },
        private _snackBar: MatSnackBar
    ) {
        if (data?.electricEngine) {
            this.electricEngine = data.electricEngine;
        }
    }

    ngOnInit(): void {}

    addElectricEngine() {
        this.electricEngine = {
            id: 0,
            batteryCapacity: this.batteryCapacity?.value,
            motor_range: this.motorRange?.value,
            type: this.type?.value,
        };
        if (this.electricEngine) {
            this.electricEngineService.insertElectricEngine(this.electricEngine).subscribe({
                next: (resp) => {
                    this.dialogRef.close(resp.responseBody);
                },
                error: (error) => {
                    console.log(error);
                    error.error.errors.forEach((err: string) => {
                        this._snackBar.open(err, "OK");
                    });
                },
            });
        }
    }

    editElectricEngine() {
        this.electricEngine = {
            id: this.data.electricEngine.id,
            batteryCapacity: this.batteryCapacity?.value,
            motor_range: this.motorRange?.value,
            type: this.type?.value,
        };
        if (this.electricEngine) {
            this.electricEngineService.updateElectricEngine(this.electricEngine).subscribe({
                next: (resp) => {
                    this.dialogRef.close(resp.responseBody);
                },
                error: (error) => {
                    console.log(error);
                    error.error.errors.forEach((err: string) => {
                        this._snackBar.open(err, "OK");
                    });
                },
            });
        }
    }
}
