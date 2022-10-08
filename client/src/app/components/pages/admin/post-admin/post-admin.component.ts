import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PostDialogComponent } from "src/app/components/dialogs/admin-dialogs/post-dialog/post-dialog.component";
import { Post } from "src/app/models/post.model";
import { PostService } from "src/app/services/post-service/post.service";

@Component({
    selector: "app-post-admin",
    templateUrl: "./post-admin.component.html",
    styleUrls: ["./post-admin.component.scss"],
})
export class PostAdminComponent implements OnInit {
    dataSource: Post[] = [];

    constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private postService: PostService) {}

    ngOnInit(): void {
        this.getAllPosts();
    }

    displayedColumns: string[] = ["#", "title", "description", "price", "car", "Actions"];

    edit(id: number) {
        this.postService.getPostById(id).subscribe({
            next: (resp) => {
                const dialogRef = this.dialog.open(PostDialogComponent, {
                    data: { post: resp },
                    width: "500px",
                });

                dialogRef.afterClosed().subscribe((result) => {
                    console.log(`Dialog result: ${result}`);
                    if (result) {
                        this.getAllPosts();
                        this._snackBar.open("Succesfully edited a Post in the database", "", {
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

    getAllPosts() {
        this.postService.getAllPosts().subscribe({
            next: (resp) => {
                this.dataSource = resp;
            },
            error: (err) => {},
        });
    }

    delete(id: number) {
        this.postService.deletePost(id).subscribe({
            next: (resp) => {
                if (resp.responseBody === "Post removed") {
                    this._snackBar.open("Post removed!", "", { duration: 2000 });
                } else {
                    this._snackBar.open("Post could not be removed!", "", { duration: 2000 });
                }
            },
            error: (err) => {
                this._snackBar.open("Something went wrong!", "", { duration: 2000 });
            },
        });
    }

    addNewPost() {
        const dialogRef = this.dialog.open(PostDialogComponent, {
            width: "500px",
            minWidth: "300px",
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
            if (result) {
                this.getAllPosts();
                this._snackBar.open("Succesfully added a new Post to the database", "", {
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
