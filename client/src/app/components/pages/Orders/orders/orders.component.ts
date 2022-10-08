import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Transaction } from "src/app/models/transaction.model";
import { User } from "src/app/models/user.model";
import { OrderService } from "src/app/services/order-service/order.service";
import { SessionService } from "src/app/services/session/session.service";

@Component({
    selector: "app-orders",
    templateUrl: "./orders.component.html",
    styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
    orders: Transaction[] = [];
    user: User | null = null;

    constructor(
        private orderService: OrderService,
        private snackBar: MatSnackBar,
        private sessionService: SessionService
    ) {
        this.sessionService.userObservable.subscribe((user) => {
            this.user = user;
            if (this.user?.id) {
                this.getAllOrdersByUserId(this.user.id);
            }
        });
    }

    ngOnInit(): void {}

    getAllOrdersByUserId(id: number) {
        this.orderService.getOrderByUserId(id).subscribe({
            next: (resp) => {
                this.orders = resp;
            },
            error: (err) => {
                this.snackBar.open("Something went wrong!", "", { duration: 2000 });
            },
        });
    }
}
