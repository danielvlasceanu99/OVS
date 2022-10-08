import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EngineDialogComponent } from "src/app/components/dialogs/admin-dialogs/engine-dialog/engine-dialog.component";
import { Engine } from "src/app/models/engine.model";
import { EngineService } from "src/app/services/engine-service/engine.service";

@Component({
    selector: "app-engine",
    templateUrl: "./engine.component.html",
    styleUrls: ["./engine.component.scss"],
})
export class EngineComponent implements OnInit {
    displayedColumns: string[] = ["#", "Horsepower", "Torque", "Electric Engine", "Fuel Engine", "Actions"];
    dataSource: Engine[] = [];

    constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private engineService: EngineService) {}

    ngOnInit(): void {
        this.getAllEngines();
    }

    getAllEngines() {
        this.engineService.getAllEngines().subscribe({
            next: (resp) => {
                this.dataSource = resp;
            },
            error: (err) => {
                this._snackBar.open("There was a problem geting the engines!", "", {
                    panelClass: "snack-bar-err",
                    duration: 2000,
                });
            },
        });
    }

    add() {
        const dialogRef = this.dialog.open(EngineDialogComponent, {
            width: "500px",
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getAllEngines();
                this._snackBar.open("Succesfully added a new Engine to the database", "", {
                    panelClass: "snack-bar-err",
                    duration: 2000,
                });
            }
        });
    }

    edit(id: number) {
        this.engineService.getEngineById(id).subscribe({
            next: (resp) => {
                const dialogRef = this.dialog.open(EngineDialogComponent, {
                    data: { engine: resp },
                    width: "500px",
                });
                dialogRef.afterClosed().subscribe((result) => {
                    if (result) {
                        this.getAllEngines();
                        this._snackBar.open("Succesfully edited Engine!", "", {
                            panelClass: "snack-bar-err",
                            duration: 2000,
                        });
                    }
                });
            },
            error: (err) => {},
        });
    }

    delete(id: number) {
        this.engineService.deleteEngine(id).subscribe({
            next: (resp) => {
                if (resp.responseBody === "Engine removed") {
                    this._snackBar.open("Engine removed!", "", { duration: 2000 });
                    this.getAllEngines();
                } else {
                    this._snackBar.open("Engine could not be removed!", "", { duration: 2000 });
                }
            },
            error: (err) => {
                this._snackBar.open("Something went wrong!", "", { duration: 2000 });
            },
        });
    }
}
