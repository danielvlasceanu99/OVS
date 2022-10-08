import { Component, Inject, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ElectricEngine } from "src/app/models/electric-engine.model";
import { Engine } from "src/app/models/engine.model";
import { FuelEngine } from "src/app/models/fuel-engine.model";
import { ElectricEngineService } from "src/app/services/electric-engine-service/electric-engine.service";
import { EngineService } from "src/app/services/engine-service/engine.service";
import { FuelEngineService } from "src/app/services/fuel-engine-service/fuel-engine.service";

@Component({
    selector: "app-engine-dialog",
    templateUrl: "./engine-dialog.component.html",
    styleUrls: ["./engine-dialog.component.scss"],
})
export class EngineDialogComponent implements OnInit {
    engine: Engine | null = null;

    electricEngines: ElectricEngine[] = [];
    fuelEngines: FuelEngine[] = [];

    engineFormGroup = new FormGroup({
        horsePower: new FormControl(this.data?.engine?.horsePower, [
            Validators.required,
            Validators.min(50),
            Validators.max(1500),
        ]),
        torque: new FormControl(this.data?.engine?.torque, [
            Validators.required,
            Validators.min(40),
            Validators.max(1500),
        ]),
        fuelEngine: new FormControl(this.data?.engine?.fuelEngine ? this.data?.engine?.fuelEngine?.id : "null", [
            Validators.required,
        ]),
        electricEngine: new FormControl(
            this.data?.engine?.electricEngine ? this.data?.engine?.electricEngine?.id : "null",
            [Validators.required]
        ),
    });

    get horsePower(): AbstractControl | null {
        return this.engineFormGroup.get("horsePower");
    }
    get torque(): AbstractControl | null {
        return this.engineFormGroup.get("torque");
    }
    get fuelEngine(): AbstractControl | null {
        return this.engineFormGroup.get("fuelEngine");
    }
    get electricEngine(): AbstractControl | null {
        return this.engineFormGroup.get("electricEngine");
    }

    constructor(
        private engieService: EngineService,
        private electricEngineService: ElectricEngineService,
        private fuelEngieService: FuelEngineService,
        private dialogRef: MatDialogRef<EngineDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { engine: Engine },
        private _snackBar: MatSnackBar
    ) {
        if (data?.engine) {
            this.engine = data.engine;
        }
    }
    ngOnInit(): void {
        this.electricEngineService.getAllElectricEngines().subscribe({
            next: (response) => {
                this.electricEngines = response;
            },
            error: () => {
                this._snackBar.open("There was an error", "", {
                    panelClass: "snack-bar-err",
                    duration: 2000,
                });
            },
        });

        this.fuelEngieService.getAllFuelEngines().subscribe({
            next: (response) => {
                this.fuelEngines = response;
            },
            error: () => {
                this._snackBar.open("There was an error", "", {
                    panelClass: "snack-bar-err",
                    duration: 2000,
                });
            },
        });
    }

    addEngine() {
        this.engine = {
            id: 0,
            horsePower: this.horsePower?.value,
            torque: this.torque?.value,
            electricEngineId: this.electricEngine?.value === "null" ? null : this.electricEngine?.value,
            fuelEngineId: this.fuelEngine?.value === "null" ? null : this.fuelEngine?.value,
        };

        if (this.engine.fuelEngineId !== null || this.engine.electricEngineId !== null) {
            this.engieService.insertEngine(this.engine).subscribe({
                next: (response) => {
                    this.dialogRef.close(response);
                },
            });
        } else {
            this._snackBar.open("An engine must have either a fuel engine or an electric engine!", "", {
                duration: 2000,
            });
        }
    }
    editEngine() {
        this.engine = {
            id: this.data.engine.id,
            horsePower: this.horsePower?.value,
            torque: this.torque?.value,
            electricEngineId: this.electricEngine?.value === "null" ? null : this.electricEngine?.value,
            fuelEngineId: this.fuelEngine?.value === "null" ? null : this.fuelEngine?.value,
        };

        if (this.engine.fuelEngineId !== null || this.engine.electricEngineId !== null) {
            this.engieService.updateEngine(this.engine).subscribe({
                next: (response) => {
                    this.dialogRef.close(response);
                },
            });
        } else {
            this._snackBar.open("An engine must have either a fuel engine or an electric engine!", "", {
                duration: 2000,
            });
        }
    }
}
