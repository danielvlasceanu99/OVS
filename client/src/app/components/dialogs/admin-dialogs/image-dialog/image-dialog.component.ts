import { Component, Inject, Input, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Image } from "src/app/models/image.model";
import { Post } from "src/app/models/post.model";
import { FileService } from "src/app/services/file-service/file.service";
import { ImageService } from "src/app/services/image-service/image.service";
import { PostService } from "src/app/services/post-service/post.service";

@Component({
    selector: "app-image-dialog",
    templateUrl: "./image-dialog.component.html",
    styleUrls: ["./image-dialog.component.scss"],
})
export class ImageDialogComponent implements OnInit {
    image: File | null = null;
    localUrl: string = "";
    imgModel: Image | null = null;
    posts: Post[] = [];

    imageFormGroup = new FormGroup({
        postFormControl: new FormControl(this.imgModel?.post?.id, [Validators.required]),
    });

    get postFormControl(): AbstractControl | null {
        return this.imageFormGroup.get("postFormControl");
    }
    constructor(
        private fileService: FileService,
        private snackBar: MatSnackBar,
        private imageService: ImageService,
        private postService: PostService,
        private dialogRef: MatDialogRef<ImageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { image: Image },
        private _snackBar: MatSnackBar
    ) {
        if (data?.image) {
            this.imgModel = data.image;
        }
    }

    ngOnInit(): void {
        this.postService.getAllPosts().subscribe({
            next: (response) => {
                this.posts = response;
            },
            error: () => {
                this._snackBar.open("There was an error", "", {
                    panelClass: "snack-bar-err",
                    duration: 2000,
                });
            },
        });
    }

    openFile() {
        const input = document.querySelector("#image") as HTMLInputElement;
        input.click();
    }

    handle(event: any) {
        console.log(event.target.files[0]);

        if (event.target.files && event.target.files[0]) {
            this.image = event.target.files[0];
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.localUrl = event.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    addImage() {
        if (this.image) {
            const formData = new FormData();
            formData.append("file", this.image);

            this.fileService.uploadImage(formData).subscribe({
                next: (resp) => {
                    if (resp === "File uploaded successfully") {
                        this.snackBar.open("Image uploaded successfully!", "", { duration: 2000 });
                        this.imageService
                            .insertImage({ id: 0, imageUrl: this.image?.name, postId: this.postFormControl?.value })
                            .subscribe({
                                next: (response) => {
                                    if (response.responseBody) {
                                        this.snackBar.open("Image uploaded successfully!", "", { duration: 2000 });
                                        this.dialogRef.close(response);
                                    }
                                },
                            });
                    } else {
                        this.snackBar.open("Image uploading failed!", "", { duration: 2000 });
                    }
                },
                error: () => {
                    this.snackBar.open("Something went wrong!", "", { duration: 2000 });
                },
            });
        }
    }

    clearImage() {
        this.image = null;
        this.localUrl = "";
    }
}
