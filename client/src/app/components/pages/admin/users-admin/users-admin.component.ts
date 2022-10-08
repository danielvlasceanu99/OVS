import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserDialogComponent } from "src/app/components/dialogs/admin-dialogs/user-dialog/user-dialog.component";
import { User } from "src/app/models/user.model";
import { SessionService } from "src/app/services/session/session.service";
import { UserService } from "src/app/services/user-service/user.service";

@Component({
    selector: "app-users-admin",
    templateUrl: "./users-admin.component.html",
    styleUrls: ["./users-admin.component.scss"],
})
export class UsersAdminComponent implements OnInit {
    dataSource: User[] = [];
    curentUser: User | null = null;

    constructor(
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private userService: UserService,
        private sessionService: SessionService
    ) {
        this.sessionService.userObservable.subscribe({
            next: (response) => {
                this.curentUser = response;
            },
            error: (error) => {
                this._snackBar.open("There was an error", "", { duration: 2000 });
            },
        });
    }

    ngOnInit(): void {
        this.getAllUsers();
    }

    displayedColumns: string[] = ["#", "firstName", "lastName", "email", "Actions"];

    edit(id: number) {
        this.userService.getUserById(id).subscribe({
            next: (resp) => {
                this.dialog.open(UserDialogComponent, {
                    data: resp,
                    width: "500px",
                });
            },
            error: (err) => {},
        });
    }

    getAllUsers() {
        this.userService.getAllUsers().subscribe({
            next: (resp) => {
                this.dataSource = resp;
                console.log(this.dataSource);
            },
            error: (err) => {},
        });
    }

    delete(id: number) {
        this.userService.deleteUser(id).subscribe({
            next: (resp) => {
                if (resp.responseBody === "User removed") {
                    this._snackBar.open("User removed!", "", { duration: 2000 });
                    this.getAllUsers();
                } else {
                    this._snackBar.open("User could not be removed!", "", { duration: 2000 });
                }
            },
            error: (err) => {
                this._snackBar.open("Something went wrong!", "", { duration: 2000 });
            },
        });
    }

    addUser() {
        const dialogRef = this.dialog.open(UserDialogComponent, {
            width: "500px",
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
            if (result) {
                this._snackBar.open("Succesfully added a new User to the database", "", {
                    panelClass: "snack-bar-err",
                    duration: 2000,
                });
                this.getAllUsers();
            }
        });
    }
}
