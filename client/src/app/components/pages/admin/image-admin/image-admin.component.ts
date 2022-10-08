import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ImageDialogComponent } from "src/app/components/dialogs/admin-dialogs/image-dialog/image-dialog.component";
import { ViewImageDialogComponent } from "src/app/components/dialogs/admin-dialogs/view-image-dialog/view-image-dialog.component";
import { Image } from "src/app/models/image.model";
import { ImageService } from "src/app/services/image-service/image.service";

@Component({
    selector: "app-image-admin",
    templateUrl: "./image-admin.component.html",
    styleUrls: ["./image-admin.component.scss"],
})
export class ImageAdminComponent implements OnInit {
    constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private imageService: ImageService) {}

    displayedColumns = ["#", "url", "post", "actions"];
    dataSource: Image[] = [];

    ngOnInit(): void {
        this.getAllImages();
    }

    getAllImages() {
        this.imageService.getAllImage().subscribe({
            next: (response) => {
                this.dataSource = response;
                console.log(this.dataSource);
            },
            error: (error) => {},
        });
    }

    addNewImage() {
        const dialogRef = this.dialog.open(ImageDialogComponent, {
            width: "500px",
            minWidth: "300px",
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
            if (result) {
                this.getAllImages();
                this._snackBar.open("Succesfully added a new image to the database", "", {
                    panelClass: "snack-bar-err",
                    duration: 2000,
                });
            }
        });
    }
    delete(id: number) {
        this.imageService.deleteImage(id).subscribe({
            next: (response) => {
                if (response.responseBody === "Image removed") {
                    this._snackBar.open("Image removed", "", {
                        panelClass: "snack-bar-err",
                        duration: 2000,
                    });
                    this.getAllImages();
                }
            },
        });
    }

    openImage(url: string) {
        const dialogRef = this.dialog.open(ViewImageDialogComponent, {
            width: "1000px",
            minWidth: "600px",
            data: {
                url: url,
            },
        });
    }
}
