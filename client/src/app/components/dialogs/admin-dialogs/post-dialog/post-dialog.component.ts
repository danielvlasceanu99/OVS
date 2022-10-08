import { Component, Inject, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Car } from "src/app/models/car.model";
import { Post } from "src/app/models/post.model";
import { CarService } from "src/app/services/car-service/car.service";
import { PostService } from "src/app/services/post-service/post.service";

@Component({
    selector: "app-post-dialog",
    templateUrl: "./post-dialog.component.html",
    styleUrls: ["./post-dialog.component.scss"],
})
export class PostDialogComponent implements OnInit {
    formGroup = new FormGroup({
        title: new FormControl(this.data?.post.title, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(255),
            Validators.pattern("[a-zA-Z0-9 ]*"),
        ]),
        description: new FormControl(this.data?.post.description, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(255),
        ]),
        price: new FormControl(this.data?.post.price, [
            Validators.required,
            Validators.min(0),
            Validators.max(5000000),
            Validators.pattern("[0-9]*"),
        ]),
        car: new FormControl(this.data?.post.car, [Validators.required]),
    });

    get title(): AbstractControl | null {
        return this.formGroup.get("title");
    }

    get description(): AbstractControl | null {
        return this.formGroup.get("description");
    }

    get price(): AbstractControl | null {
        return this.formGroup.get("price");
    }

    get car(): AbstractControl | null {
        return this.formGroup.get("car");
    }
    post: Post | null = null;
    cars: Car[] = [];

    constructor(
        private dialogRef: MatDialogRef<PostDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { post: Post },
        private _snackBar: MatSnackBar,
        private carService: CarService,
        private postService: PostService
    ) {
        if (this.data) {
            this.post = this.data.post;
        }
    }

    ngOnInit(): void {
        this.carService.getAllCars().subscribe((cars) => {
            this.cars = cars;
        });
    }

    selectTitle(event: any) {
        console.log(event);
        this.title?.setValue(event.value.brand + " " + event.value.model);
    }

    addPost() {
        this.post = {
            id: this.data?.post.id,
            title: this.title?.value,
            description: this.description?.value,
            price: this.price?.value,
            car: this.car?.value,
            carId: this.car?.value.id,
        };

        this.postService.insertPost(this.post).subscribe({
            next: (post) => {
                this.dialogRef.close(post);
                this._snackBar.open("Post added successfully", "OK");
            },
            error: (err) => {
                this._snackBar.open("The selected car already has a post made for it");
            },
        });
    }

    edit() {
        this.post = {
            id: this.data?.post.id,
            title: this.title?.value,
            description: this.description?.value,
            price: this.price?.value,
            car: this.car?.value,
            carId: this.car?.value.id,
        };

        this.postService.updatePost(this.post).subscribe({
            next: (post) => {
                this.dialogRef.close(post);
                this._snackBar.open("Post edited successfully", "OK");
            },
            error: (err) => {
                this._snackBar.open("The selected car already has a post made for it");
            },
        });
    }
}
