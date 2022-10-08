import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Transaction } from "src/app/models/transaction.model";
import { OrderService } from "src/app/services/order-service/order.service";

@Component({
    selector: "app-transaction-admin",
    templateUrl: "./transaction-admin.component.html",
    styleUrls: ["./transaction-admin.component.scss"],
})
export class TransactionAdminComponent implements OnInit {
    dataSource: Transaction[] = [];

    constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private orderService: OrderService) {}

    ngOnInit(): void {
        this.getAllOrders();
    }

    displayedColumns: string[] = ["#", "post", "user", "date", "price"];

    getAllOrders() {
        this.orderService.getAllOrders().subscribe({
            next: (resp) => {
                this.dataSource = resp;
            },
            error: (err) => {},
        });
    }

    // delete(id: number) {
    //     this.orderService.deleteOrder(id).subscribe({
    //         next: (resp) => {
    //             if (resp.responseBody === "Transaction removed") {
    //                 this._snackBar.open("Order removed!", "", { duration: 2000 });
    //                 this.getAllOrders();
    //             } else {
    //                 this._snackBar.open("Order could not be removed!", "", { duration: 2000 });
    //                 this.getAllOrders();
    //             }
    //         },
    //         error: (err) => {
    //             this._snackBar.open("Something went wrong!", "", { duration: 2000 });
    //         },
    //     });
    // }
}
