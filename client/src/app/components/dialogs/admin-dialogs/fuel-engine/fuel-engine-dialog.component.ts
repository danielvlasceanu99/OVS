import { Component, Inject, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FuelEngine } from "src/app/models/fuel-engine.model";
import { FuelEngineService } from "src/app/services/fuel-engine-service/fuel-engine.service";

@Component({
    selector: "app-fuel-engine-dialog",
    templateUrl: "./fuel-engine-dialog.component.html",
    styleUrls: ["./fuel-engine-dialog.component.scss"],
})
export class FuelEngineDialogComponent implements OnInit {
    fuelEngine: FuelEngine | null = null;

    fuelEngineFormGroup = new FormGroup({
        fuelConsumption: new FormControl(this.data?.fuelEngine?.fuelConsumption, [
            Validators.required,
            Validators.min(0),
            Validators.max(40),
        ]),
        co2Emissions: new FormControl(this.data?.fuelEngine?.co2Emissions, [
            Validators.required,
            Validators.min(0),
            Validators.max(250),
        ]),
        displacement: new FormControl(this.data?.fuelEngine?.displacement, [
            Validators.required,
            Validators.min(0),
            Validators.max(16),
        ]),
        fuelType: new FormControl(this.data?.fuelEngine?.fuelType, [Validators.required]),
        engineLayout: new FormControl(this.data?.fuelEngine?.engineLayout, [Validators.required]),
        strokeType: new FormControl(this.data?.fuelEngine?.strokeType, [Validators.required]),
        numberOfCylinders: new FormControl(this.data?.fuelEngine?.numberOfCylinders, [Validators.required]),
        turbine: new FormControl(this.data?.fuelEngine?.hasTurbine, [Validators.required]),
        supercharge: new FormControl(this.data?.fuelEngine?.hasSupercharge, [Validators.required]),
    });

    get fuelConsumption(): AbstractControl | null {
        return this.fuelEngineFormGroup.get("fuelConsumption");
    }
    get co2Emissions(): AbstractControl | null {
        return this.fuelEngineFormGroup.get("co2Emissions");
    }
    get displacement(): AbstractControl | null {
        return this.fuelEngineFormGroup.get("displacement");
    }
    get fuelType(): AbstractControl | null {
        return this.fuelEngineFormGroup.get("fuelType");
    }
    get engineLayout(): AbstractControl | null {
        return this.fuelEngineFormGroup.get("engineLayout");
    }
    get strokeType(): AbstractControl | null {
        return this.fuelEngineFormGroup.get("strokeType");
    }
    get numberOfCylinders(): AbstractControl | null {
        return this.fuelEngineFormGroup.get("numberOfCylinders");
    }
    get turbine(): AbstractControl | null {
        return this.fuelEngineFormGroup.get("turbine");
    }
    get supercharge(): AbstractControl | null {
        return this.fuelEngineFormGroup.get("supercharge");
    }

    set setTurbine(value: any) {
        this.fuelEngineFormGroup.get("turbine")?.value(value);
    }
    set setSuperCharge(value: any) {
        this.fuelEngineFormGroup.get("supercharge")?.value(value);
    }
    constructor(
        private _snackBar: MatSnackBar,
        private dialogRef: MatDialogRef<FuelEngineDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { fuelEngine: FuelEngine },
        private fuelEngineService: FuelEngineService
    ) {
        if (data) {
            this.fuelEngine = data.fuelEngine;
        }
    }

    ngOnInit(): void {}

    addFosilFuelEngine() {
        this.fuelEngine = {
            id: 0,
            fuelConsumption: this.fuelConsumption?.value,
            co2Emissions: this.co2Emissions?.value,
            displacement: this.displacement?.value,
            fuelType: this.fuelType?.value,
            engineLayout: this.engineLayout?.value,
            strokeType: this.strokeType?.value,
            numberOfCylinders: this.numberOfCylinders?.value,
            hasTurbine: this.turbine?.value == "true",
            hasSupercharge: this.supercharge?.value == "true",
        };

        this.fuelEngineService.insertFuelEngine(this.fuelEngine).subscribe({
            next: (response) => {
                if (response.responseBody) {
                    this.dialogRef.close(response.responseBody);
                } else {
                    response.responseBody.forEach((err: string) => {
                        this._snackBar.open(err, "OK");
                    });
                }
            },
            error: (error) => {
                error.error.errors.forEach((err: string) => {
                    this._snackBar.open(err, "OK");
                });
            },
        });
    }

    editFosilFuelEngine() {
        this.fuelEngine = {
            id: this.data.fuelEngine.id,
            fuelConsumption: this.fuelConsumption?.value,
            co2Emissions: this.co2Emissions?.value,
            displacement: this.displacement?.value,
            fuelType: this.fuelType?.value,
            engineLayout: this.engineLayout?.value,
            strokeType: this.strokeType?.value,
            numberOfCylinders: this.numberOfCylinders?.value,
            hasTurbine: this.turbine?.value == "true",
            hasSupercharge: this.supercharge?.value == "true",
        };

        this.fuelEngineService.updateFuelEngine(this.fuelEngine).subscribe({
            next: (response) => {
                if (response.responseBody) {
                    this.dialogRef.close("Successfully edited ICE engine");
                } else {
                    response.responseBody.forEach((err: string) => {
                        this._snackBar.open(err, "OK");
                    });
                }
            },
            error: (error) => {
                error.error.errors.forEach((err: string) => {
                    this._snackBar.open(err, "OK");
                });
            },
        });
    }
}
