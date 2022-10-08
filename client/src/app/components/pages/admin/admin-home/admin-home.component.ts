import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-admin-home",
    templateUrl: "./admin-home.component.html",
    styleUrls: ["./admin-home.component.scss"],
})
export class AdminHomeComponent {
    constructor(private router: Router) {}

    pages = [
        {
            title: "I.C.E. Engine",
            url: "../../../../../assets/svg/pistons.svg",
            content: "Fosil fuel engine administration page",
            pageUrl: "admin/fuel-engine",
        },
        {
            title: "Electric Engine",
            url: "../../../../../assets/svg/engine-motor.svg",
            content: "Electric engine administration page",
            pageUrl: "admin/electric",
        },
        {
            title: "Engine",
            url: "../../../../../assets/svg/gearbox-engine.svg",
            content: "Engine administration page",
            pageUrl: "admin/engine",
        },
        {
            title: "Transmision",
            url: "../../../../../assets/svg/manual-transmission.svg",
            content: "Transmission administration page",
            pageUrl: "admin/transmission",
        },
        {
            title: "Car",
            url: "../../../../../assets/svg/car.svg",
            content: "Car administration page",
            pageUrl: "admin/car",
        },
        {
            title: "Post",
            url: "../../../../../assets/svg/poster.svg",
            content: "Post administration page",
            pageUrl: "admin/post",
        },
        {
            title: "Image",
            url: "../../../../../assets/svg/pictures.svg",
            content: "Images administration page",
            pageUrl: "admin/image",
        },
        {
            title: "User",
            url: "../../../../../assets/svg/man-and-woman-user.svg",
            content: "Users administration page",
            pageUrl: "admin/users",
        },
        {
            title: "Order",
            url: "../../../../../assets/svg/pay-money.svg",
            content: "Orders administration page",
            pageUrl: "admin/transaction",
        },
    ];

    goToPage(pageUrl: string) {
        this.router.navigate([pageUrl]);
    }
}
