import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FuelEngineDialogComponent } from "src/app/components/dialogs/admin-dialogs/fuel-engine/fuel-engine-dialog.component";
import { FuelEngineService } from "src/app/services/fuel-engine-service/fuel-engine.service";

interface FuelEngine {
    id: number;
    fuelConsumption: number;
    co2Emissions: number;
    displacement: number;
    fuelType: string;
    engineLayout: string;
    strokeType: string;
    numberOfCylinders: number;
    hasTurbine: boolean;
    hasSupercharge: boolean;
}
@Component({
    selector: "app-fuel-engine-admin",
    templateUrl: "./fuel-engine-admin.component.html",
    styleUrls: ["./fuel-engine-admin.component.scss"],
})
export class FuelEngineAdminComponent implements OnInit {
    displayedColumns: string[] = [
        "#",
        "Fuel consumption",
        "CO2 emissions",
        "Displacement",
        "Fuel type",
        "Engine layout",
        "Stroke type",
        "Number of cylinders",
        "Has turbine",
        "Has supercharge",
        "Actions",
    ];
    dataSource: FuelEngine[] = [];

    constructor(
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private fuelEngineService: FuelEngineService
    ) {}

    ngOnInit(): void {
        this.getAllFuelEngines();
    }

    getAllFuelEngines() {
        this.fuelEngineService.getAllFuelEngines().subscribe({
            next: (resp) => {
                this.dataSource = resp;
            },
            error: (err) => {},
        });
    }

    addFosilFuelEngine() {
        const dialogRef = this.dialog.open(FuelEngineDialogComponent, {
            width: "500px",
            minWidth: "300px",
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
            if (result) {
                console.log(result);
                this.getAllFuelEngines();
                console.log(this.dataSource);
                this._snackBar.open("Succesfully added a new ICE engine to the database", "", {
                    panelClass: "snack-bar-err",
                    duration: 2000,
                });
            }
        });
    }

    edit(id: number) {
        this.fuelEngineService.getFuelEngineById(id).subscribe({
            next: (resp) => {
                const dialogRef = this.dialog.open(FuelEngineDialogComponent, {
                    data: { fuelEngine: resp },
                    width: "500px",
                });
                dialogRef.afterClosed().subscribe((result) => {
                    this.getAllFuelEngines();
                    if (result) {
                        this._snackBar.open(result, "", {
                            duration: 2000,
                        });
                    }
                });
            },
            error: (err) => {},
        });
    }

    delete(id: number) {
        this.fuelEngineService.deleteFuelEngine(id).subscribe({
            next: (resp) => {
                if (resp.responseBody === "ICE engine removed") {
                    this._snackBar.open("ICE engine removed!", "", { duration: 2000 });
                    this.getAllFuelEngines();
                } else {
                    this._snackBar.open("ICE engine could not be removed!", "", { duration: 2000 });
                }
            },
            error: (err) => {
                this._snackBar.open("Something went wrong!", "", { duration: 2000 });
            },
        });
    }
}
