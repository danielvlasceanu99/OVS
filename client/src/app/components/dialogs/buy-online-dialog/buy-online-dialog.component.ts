import { Component, Inject, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CookieService } from "ngx-cookie-service";
import { Car } from "src/app/models/car.model";
import { Post } from "src/app/models/post.model";
import { Transaction } from "src/app/models/transaction.model";
import { CarService } from "src/app/services/car-service/car.service";
import { OrderService } from "src/app/services/order-service/order.service";
import { PostService } from "src/app/services/post-service/post.service";

@Component({
    selector: "app-buy-online-dialog",
    templateUrl: "./buy-online-dialog.component.html",
    styleUrls: ["./buy-online-dialog.component.scss"],
})
export class BuyOnlineDialogComponent implements OnInit {
    buyOnlineFromGroup = new FormGroup({
        cardNumber: new FormControl("", [Validators.required, Validators.maxLength(19)]),
        cardholderName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        expirationDate: new FormControl(""),
        cvv: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
    });

    get cardNumber(): AbstractControl | null {
        return this.buyOnlineFromGroup.get("cardNumber");
    }
    get cardholderName(): AbstractControl | null {
        return this.buyOnlineFromGroup.get("cardholderName");
    }
    get expirationDate(): AbstractControl | null {
        return this.buyOnlineFromGroup.get("expirationDate");
    }
    get cvv(): AbstractControl | null {
        return this.buyOnlineFromGroup.get("cvv");
    }

    public minDate: Date;
    public maxDate: Date;
    constructor(
        private dialogRef: MatDialogRef<BuyOnlineDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { post: Post; id: number, price: number },
        private carService: CarService,
        private postService: PostService,
        private cookieService: CookieService,
        private orderService: OrderService,
        private _snackBar: MatSnackBar

    ) {
        this.minDate = new Date();
        this.maxDate = new Date();
        this.maxDate.setMonth(this.minDate.getMonth() + 48);

        console.log(this.data);
    }

    ngOnInit(): void {}

    buyOnline() {
        if (this.data.id) {
            this.buy(this.data.id, this.data.price);
        } else {
            this.configure(this.data.post);
        }
    }

    configure(post: Post) {
        let car: Car = post.car;
        car.engineId = post.car.engine?.id;
        car.transmissionId = post.car.transmission?.id;
        this.carService.insertCar(car).subscribe(
            {
                next: (response) => {
                    console.log(response);
                    let post: Post = this.data.post;
                    post.carId = response.responseBody.id;
                    this.postService.insertPost(post).subscribe(
                        {
                            next: (resp) => {
                                 this.buyConf(resp.responseBody);    
                            },
                            error: (err) => {
                                this.dialogRef.close("Error");
                            }
                        }
                    );
                },
                error: (err) => {
                    this.dialogRef.close("Error");
                }
            }
        );
    }

    buy(id: number, price: number) {
        let order: Transaction = {
          postId: id,
          userId: +this.cookieService.get('userId'),
          date: new Date(),
          price: price,
        };

        this.orderService.insertOrder(order).subscribe({
          next: (res) => {
            this.dialogRef.close('Success');
          },
          error: (err) => {
            this.dialogRef.close('Error');
          },
        }); 
    }

    buyConf(post: Post){
        let order: Transaction = {
          postId: post.id,
          userId: +this.cookieService.get('userId'),
          date: new Date(),
          price: post.price,
        };

        this.orderService.insertOrder(order).subscribe({
          next: (res) => {
            this.dialogRef.close('Success');
          },
          error: (err) => {
            this.dialogRef.close('Error');
          },
        }); 

    }

    creditCardNumberSpacing() {
        let trimmedCardNum = this.buyOnlineFromGroup.get("cardNumber")?.value.replace(/\s+/g, "");

        if (trimmedCardNum.length > 16) {
            trimmedCardNum = trimmedCardNum.substr(0, 16);
        }

        const partitions = [4, 4, 4, 4];

        const numbers: string[] = [];
        let position = 0;
        partitions.forEach((partition) => {
            const part = trimmedCardNum.substr(position, partition);
            if (part) numbers.push(part);
            position += partition;
        });

        this.buyOnlineFromGroup.get("cardNumber")?.setValue(numbers.join(" "));
    }
}
