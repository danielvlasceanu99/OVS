import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CarDialogComponent } from "src/app/components/dialogs/admin-dialogs/car-dialog/car-dialog.component";
import { Car } from "src/app/models/car.model";
import { CarService } from "src/app/services/car-service/car.service";

@Component({
    selector: "app-car-admin",
    templateUrl: "./car-admin.component.html",
    styleUrls: ["./car-admin.component.scss"],
})
export class CarAdminComponent implements OnInit {
    dataSource: Car[] = [];

    constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private carService: CarService) {}

    ngOnInit(): void {
        this.getAllCars();
    }

    displayedColumns: string[] = [
        "#",
        "brand",
        "model",
        "available",
        "manufacturingYear",
        "engine",
        "transmission",
        "color",
        "carType",
        "tractionType",
        "actions",
    ];

    edit(id: number) {
        this.carService.getCarById(id).subscribe({
            next: (resp) => {
                const dialogRef = this.dialog.open(CarDialogComponent, {
                    data: { car: resp },
                    width: "500px",
                });
                dialogRef.afterClosed().subscribe((result) => {
                    console.log(`Dialog result: ${result}`);
                    if (result) {
                        this.getAllCars();
                        this._snackBar.open("Succesfully edited the Car in the database", "", {
                            panelClass: "snack-bar-err",
                            duration: 2000,
                        });
                    } else if (!result) {
                        this._snackBar.open("unsuccesfull", "", {
                            panelClass: "snack-bar-err",
                            duration: 2000,
                        });
                    }
                });
            },
            error: (err) => {},
        });
    }

    getAllCars() {
        this.carService.getAllCars().subscribe({
            next: (resp) => {
                this.dataSource = resp;
            },
            error: (err) => {},
        });
    }

    delete(id: number) {
        this.carService.deleteCar(id).subscribe({
            next: (resp) => {
                this.getAllCars();
                if (resp.responseBody === "Car removed") {
                    this._snackBar.open("Car removed!", "", { duration: 2000 });
                } else {
                    this._snackBar.open("Car could not be removed!", "", { duration: 2000 });
                }
            },
            error: (err) => {
                this._snackBar.open("Something went wrong!", "", { duration: 2000 });
            },
        });
    }

    addCar() {
        const dialogRef = this.dialog.open(CarDialogComponent, {
            width: "500px",
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
            if (result) {
                this.getAllCars();
                this._snackBar.open("Succesfully added a new Car to the database", "", {
                    panelClass: "snack-bar-err",
                    duration: 2000,
                });
            } else if (!result) {
                this._snackBar.open("unsuccesfull", "", {
                    panelClass: "snack-bar-err",
                    duration: 2000,
                });
            }
        });
    }
}
