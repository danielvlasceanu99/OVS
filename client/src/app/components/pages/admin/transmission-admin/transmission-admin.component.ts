import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TransmissionDialogComponent } from "src/app/components/dialogs/admin-dialogs/transmission-dialog/transmission-dialog.component";
import { Transmission } from "src/app/models/transmission.model";
import { TransmissionService } from "src/app/services/transmission-service/transmission.service";

@Component({
    selector: "app-transmission-admin",
    templateUrl: "./transmission-admin.component.html",
    styleUrls: ["./transmission-admin.component.scss"],
})
export class TransmissionAdminComponent implements OnInit {
    displayedColumns: string[] = ["#", "nrOfGears", "transmissionType", "Actions"];
    dataSource: Transmission[] = [];

    constructor(
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private transmissionService: TransmissionService
    ) {}

    ngOnInit(): void {
        this.getAllTransmissions();
    }

    getAllTransmissions() {
        this.transmissionService.getAllTransmissions().subscribe({
            next: (resp) => {
                this.dataSource = resp;
            },
            error: (err) => {},
        });
    }

    addTransmission() {
        const dialogRef = this.dialog.open(TransmissionDialogComponent, {
            width: "500px",
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getAllTransmissions();
                this._snackBar.open("Succesfully added a new Transmission to the database", "", {
                    panelClass: "snack-bar-err",
                    duration: 2000,
                });
            }
        });
    }

    edit(id: number) {
        this.transmissionService.getTransmissionById(id).subscribe({
            next: (resp) => {
                this.getAllTransmissions();
                const dialogRef = this.dialog.open(TransmissionDialogComponent, {
                    data: { transmission: resp },
                    width: "500px",
                });

                dialogRef.afterClosed().subscribe((result) => {
                    if (result) {
                        this.getAllTransmissions();
                        this._snackBar.open("Succesfully added a new Transmission to the database", "", {
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
        this.transmissionService.deleteTransmission(id).subscribe({
            next: (resp) => {
                if (resp.responseBody === "Transmission removed") {
                    this._snackBar.open("Transmission removed!", "", { duration: 2000 });
                    this.getAllTransmissions();
                } else {
                    this._snackBar.open("Transmission could not be removed!", "", { duration: 2000 });
                }
            },
            error: (err) => {
                this._snackBar.open("Something went wrong!", "", { duration: 2000 });
            },
        });
    }
}
