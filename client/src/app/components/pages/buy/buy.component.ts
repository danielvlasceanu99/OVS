import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from "@angular/router";
import { map } from "rxjs";
import { Post } from "src/app/models/post.model";
import { User } from "src/app/models/user.model";
import { PostService } from "src/app/services/post-service/post.service";
import { SessionService } from "src/app/services/session/session.service";
import { BuyOnlineDialogComponent } from "../../dialogs/buy-online-dialog/buy-online-dialog.component";
import { ReserveDialogComponent } from "../../dialogs/reserve-dialog/reserve-dialog.component";

@Component({
    selector: "app-buy",
    templateUrl: "./buy.component.html",
    styleUrls: ["./buy.component.scss"],
})
export class BuyComponent implements OnInit {
    id: string | null = "";
    displayedColumns: string[] = ["key", "value"];
    post: Post | null = null;
    user: User | null = null;
    isLogedin: boolean = false;
    loaded: boolean = true;

    imgCollection: { title: string; image: string }[] = [];

    engineDataSource: { key: string; value: any }[] = [];
    fuelEgineDataSource: { key: string; value: any }[] = [];
    electricEngineDataSource: { key: string; value: any }[] = [];
    transmisionDataSource: { key: string; value: any }[] = [];

    constructor(
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private homeService: PostService,
        private route: ActivatedRoute,
        private router: Router,
        private session: SessionService
    ) {
        this.session.userObservable.subscribe((user) => {
            this.user = user;
            this.isLogedin = this.user != null;
        });
    }

    ngOnInit(): void {
        this.loaded = false;
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });

        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get("id");
        });
        if (this.id != null) {
            this.homeService.getPostById(+this.id).subscribe({
                next: (response) => {
                    this.post = response;
                    this.mapImages();
                    this.mapData();

                    this.loaded = !this.loaded;
                },
                error: (error) => {
                    this.router.navigate([`./404`]);
                },
            });
        }
    }

    buyOnline() {
        const dialogRef = this.dialog.open(BuyOnlineDialogComponent, {
            data: { id: this.id, price: this.post?.price },
        });

        dialogRef.afterClosed().subscribe((response) => {
            if (response) {
                this._snackBar.open(response, "OK");
            }
        });
    }

    reserve() {
        const dialogRef = this.dialog.open(ReserveDialogComponent);
        dialogRef.afterClosed().subscribe((response) => {
            if (response) {
                this._snackBar.open(response, "OK");
            }
        });
    }

    mapImages() {
        if (this.post?.images != undefined) {
            this.post?.images.sort((a, b) => a.id - b.id);
            for (let i = 0; i < this.post?.images.length; i++) {
                this.imgCollection.push({
                  title: (i + 1).toString(),
                  image: `http://localhost:8085/api/v1/file/${this.post.images[i].imageUrl}`,
                });
            }
            if (this.imgCollection.length === 0) {
                this.imgCollection.push({
                    title: "No images to show",
                    image: `../../../../assets/images/caravatar.png`,
                });
            }
        }
    }

    mapData() {
        this.engineDataSource.push({ key: "Power", value: this.post?.car?.engine?.horsePower });
        this.engineDataSource.push({ key: "Torque", value: this.post?.car?.engine?.torque });

        if (this.post?.car.engine?.fuelEngine != null) {
            this.mapFuelEngine();
        }

        if (this.post?.car.engine?.electricEngine != null) {
            this.mapElectricEngine();
        }
        this.transmisionDataSource.push({ key: "Type", value: this.post?.car?.transmission?.transmissionType });
        this.transmisionDataSource.push({ key: "NO of gears", value: this.post?.car?.transmission?.numberOfGears });
    }

    mapFuelEngine() {
        this.fuelEgineDataSource.push({
            key: "Fuel consumption",
            value: this.post?.car?.engine?.fuelEngine?.fuelConsumption,
        });
        this.fuelEgineDataSource.push({
            key: "Engine layout",
            value: this.post?.car?.engine?.fuelEngine?.engineLayout,
        });
        this.fuelEgineDataSource.push({ key: "Fuel type", value: this.post?.car?.engine?.fuelEngine?.fuelType });
        this.fuelEgineDataSource.push({
            key: "NO of cylinders",
            value: this.post?.car?.engine?.fuelEngine?.numberOfCylinders,
        });
        this.fuelEgineDataSource.push({
            key: "Has turbine",
            value: this.post?.car?.engine?.fuelEngine?.hasTurbine ? "Yes" : "No",
        });
        this.fuelEgineDataSource.push({
            key: "Has supercharger",
            value: this.post?.car?.engine?.fuelEngine?.hasSupercharge ? "Yes" : "No",
        });
        this.fuelEgineDataSource.push({
            key: "CO2 emissions",
            value: this.post?.car?.engine?.fuelEngine?.co2Emissions,
        });
        this.fuelEgineDataSource.push({ key: "Displacement", value: this.post?.car?.engine?.fuelEngine?.displacement });
    }

    mapElectricEngine() {
        this.electricEngineDataSource.push({ key: "Type", value: this.post?.car.engine?.electricEngine?.type });
        this.electricEngineDataSource.push({
            key: "Batery capacity",
            value: this.post?.car.engine?.electricEngine?.batteryCapacity,
        });
        this.electricEngineDataSource.push({ key: "Range", value: this.post?.car.engine?.electricEngine?.motor_range });
    }
}
