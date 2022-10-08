import { Component, Inject, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Car, CarType, TractionType } from "src/app/models/car.model";
import { Engine } from "src/app/models/engine.model";
import { Transmission } from "src/app/models/transmission.model";
import { CarService } from "src/app/services/car-service/car.service";
import { EngineService } from "src/app/services/engine-service/engine.service";
import { TransmissionService } from "src/app/services/transmission-service/transmission.service";

@Component({
    selector: "app-car-dialog",
    templateUrl: "./car-dialog.component.html",
    styleUrls: ["./car-dialog.component.scss"],
})
export class CarDialogComponent implements OnInit {
    car: Car | null = null;
    engineList: Engine[] | null = null;
    transmissionList: Transmission[] = [];
    colorList: string[] = ["black", "white", "gray", "red", "yellow", "blue"];
    tractionTypeList: TractionType[] = [TractionType.AWD, TractionType.FWD, TractionType.RWD];
    carTypeList: CarType[] = [
        CarType.SEDAN,
        CarType.COUPE,
        CarType.SPORTS,
        CarType.WAGON,
        CarType.HATCHBACK,
        CarType.CONVERTIBLE,
        CarType.SUV,
        CarType.MINIVAN,
        CarType.VAN,
        CarType.PICKUPTRUCK,
    ];
    formGroup = new FormGroup({
        brand: new FormControl(this.data?.car?.brand, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            Validators.pattern("[a-zA-Z0-9 ]*"),
        ]),
        model: new FormControl(this.data?.car?.model, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            Validators.pattern("[a-zA-Z0-9 ]*"),
        ]),
        available: new FormControl(this.data?.car?.available, [
            Validators.required,
            Validators.min(0),
            Validators.max(100),
            Validators.pattern("[0-9]*"),
        ]),
        manufacturingYear: new FormControl(this.data?.car?.manufacturingYear, [
            Validators.required,
            Validators.min(2019),
            Validators.max(2023),
            Validators.pattern("[0-9]*"),
        ]),
        engine: new FormControl(this.data?.car?.engine?.id, [Validators.required]),
        transmission: new FormControl(this.data?.car?.transmission?.id, [Validators.required]),
        color: new FormControl(this.data?.car?.color, [Validators.required]),
        carType: new FormControl(this.data?.car?.carType, [Validators.required]),
        tractionType: new FormControl(this.data?.car?.tractionType, [Validators.required]),
        numberOfDoors: new FormControl(this.data?.car?.numberOfDoors, [
            Validators.required,
            Validators.min(1),
            Validators.max(6),
        ]),
    });

    get brand(): AbstractControl | null {
        return this.formGroup.get("brand");
    }

    get model(): AbstractControl | null {
        return this.formGroup.get("model");
    }

    get available(): AbstractControl | null {
        return this.formGroup.get("available");
    }

    get manufacturingYear(): AbstractControl | null {
        return this.formGroup.get("manufacturingYear");
    }

    get engine(): AbstractControl | null {
        return this.formGroup.get("engine");
    }

    get transmission(): AbstractControl | null {
        return this.formGroup.get("transmission");
    }

    get color(): AbstractControl | null {
        return this.formGroup.get("color");
    }

    get carType(): AbstractControl | null {
        return this.formGroup.get("carType");
    }

    get tractionType(): AbstractControl | null {
        return this.formGroup.get("tractionType");
    }

    get numberOfDoors(): AbstractControl | null {
        return this.formGroup.get("numberOfDoors");
    }

    constructor(
        private dialogRef: MatDialogRef<CarDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { car: Car },
        private _snackBar: MatSnackBar,
        private carService: CarService,
        private engineService: EngineService,
        private transmissionService: TransmissionService
    ) {
        if (data) {
            this.car = this.data.car;
        }
        console.log(this.car);
    }

    ngOnInit(): void {
        this.engineService.getAllEngines().subscribe({
            next: (data) => {
                this.engineList = data;
            },
        });
        this.transmissionService.getAllTransmissions().subscribe({
            next: (data) => {
                this.transmissionList = data;
            },
        });
    }

    edit() {
        this.car = {
            id: this.data.car.id,
            brand: this.brand?.value,
            model: this.model?.value,
            available: this.available?.value,
            manufacturingYear: this.manufacturingYear?.value,
            engineId: this.engine?.value,
            transmissionId: this.transmission?.value,
            color: this.color?.value,
            carType: this.carType?.value,
            tractionType: this.tractionType?.value,
            numberOfDoors: this.numberOfDoors?.value,
        };

        this.carService.updateCar(this.car).subscribe({
            next: (data) => {
                this.dialogRef.close(data);
                this._snackBar.open("Car updated", "", {
                    duration: 2000,
                });
            },
            error: (error) => {
                this._snackBar.open("Something went wrong", "", {
                    duration: 2000,
                });
            },
        });
    }

    addCar() {
        this.car = {
            id: 0,
            brand: this.brand?.value,
            model: this.model?.value,
            available: this.available?.value,
            manufacturingYear: this.manufacturingYear?.value,
            engineId: this.engine?.value,
            transmissionId: this.transmission?.value,
            color: this.color?.value,
            carType: this.carType?.value,
            tractionType: this.tractionType?.value,
            numberOfDoors: this.numberOfDoors?.value,
        };

        console.log(this.car);

        this.carService.insertCar(this.car).subscribe((data) => {
            this.dialogRef.close(data);
            this._snackBar.open("Car added", "", {
                duration: 2000,
            });
        });
    }
}
