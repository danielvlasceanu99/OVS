import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ElectricEngineDialogComponent } from "src/app/components/dialogs/admin-dialogs/electric-engine-dialog/electric-engine-dialog.component";
import { ElectricEngine } from "src/app/models/electric-engine.model";
import { ElectricEngineService } from "src/app/services/electric-engine-service/electric-engine.service";

@Component({
    selector: "app-electric-engine-admin",
    templateUrl: "./electric-engine-admin.component.html",
    styleUrls: ["./electric-engine-admin.component.scss"],
})
export class ElectricEngineAdminComponent implements OnInit {
    displayedColumns: string[] = ["#", "type", "batteryCapacity", "motorRange", "Actions"];
    dataSource: ElectricEngine[] = [];

    constructor(
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private electricEngineService: ElectricEngineService
    ) {}

    ngOnInit(): void {
        this.getAllElectricEngines();
    }

    getAllElectricEngines() {
        this.electricEngineService.getAllElectricEngines().subscribe({
            next: (resp) => {
                this.dataSource = resp;
            },
            error: (err) => {},
        });
    }

    addElectricEngine() {
        const dialogRef = this.dialog.open(ElectricEngineDialogComponent, {
            width: "500px",
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
            if (result) {
                this.getAllElectricEngines();
                this._snackBar.open("Succesfully added a new electric engine to the database", "", {
                    panelClass: "snack-bar-err",
                    duration: 2000,
                });
            }
        });
    }

    edit(id: number) {
        this.electricEngineService.getElectricEngineById(id).subscribe({
            next: (resp) => {
                this.dialog.open(ElectricEngineDialogComponent, {
                    data: { electricEngine: resp },
                    width: "500px",
                });
                this.dialog.afterAllClosed.subscribe(() => {
                    this.getAllElectricEngines();
                });
            },
            error: (err) => {
                this._snackBar.open("Something went wrong!", "", { duration: 3000 });
            },
        });
    }

    delete(id: number) {
        this.electricEngineService.deleteElectricEngine(id).subscribe({
            next: (resp) => {
                if (resp.responseBody === "Electric engine removed") {
                    this._snackBar.open("Electric engine removed!", "", { duration: 2000 });
                } else {
                    this._snackBar.open("Electric engine could not be removed!", "", { duration: 2000 });
                }
            },
            error: (err) => {
                this._snackBar.open("Something went wrong!", "", { duration: 2000 });
            },
        });
    }
}
