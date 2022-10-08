import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from "@angular/router";
import { Car } from "src/app/models/car.model";
import { Engine } from "src/app/models/engine.model";
import { Post } from "src/app/models/post.model";
import { Transmission } from "src/app/models/transmission.model";
import { User } from "src/app/models/user.model";
import { EngineService } from "src/app/services/engine-service/engine.service";
import { PostService } from "src/app/services/post-service/post.service";
import { SessionService } from "src/app/services/session/session.service";
import { TransmissionService } from "src/app/services/transmission-service/transmission.service";
import { BuyOnlineDialogComponent } from "../../dialogs/buy-online-dialog/buy-online-dialog.component";


export enum TractionType {
    AWD = "AWD",
    FWD = "FWD",
    RWD = "RWD",
}

@Component({
    selector: "app-create-post",
    templateUrl: "./create-post.component.html",
    styleUrls: ["./create-post.component.scss"],
})
export class CreatePostComponent implements OnInit {
    tractionType: TractionType[] = [TractionType.AWD, TractionType.FWD, TractionType.RWD];
    color: string[] = ["black", "white", "gray", "red", "yellow", "blue"];
    imgCollection: { title: string; image: string }[] = [];

    id: string | null = "";
    isLogedin: boolean = false;
    postLoaded: boolean = true;
    enginesLoaded: boolean = true;
    transmisionsLoaded: boolean = true;
    carModel: any = {
        engineId: 0,
        transmissionId: 0,
        color: null,
        traction: null
    }

    post: Post | null = null;
    user: User | null = null;
    engines: Engine[] = [];
    transmissions: Transmission[] = [];

    constructor(
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private homeService: PostService,
        private engineService: EngineService,
        private transmissionService: TransmissionService,
        private session: SessionService
    ) {
        this.session.userObservable.subscribe((user) => {
            this.user = user;
            this.isLogedin = this.user != null;
        });
        
    }

    ngOnInit(): void {
        this.postLoaded = false;
        this.enginesLoaded = false;
        this.transmisionsLoaded = false;
        this.manageRouting();
        if (this.id != null) {
            this.getPostById();
            this.getEngines();
            this.getTransmissions();
        }
    }

    private getPostById() {
        if(this.id !== null) {
            this.homeService.getPostById(+this.id).subscribe({
                next: (response) => {
                    this.post = response;
                    this.mapImages();
                    this.postLoaded = !this.postLoaded;
                    console.log(this.post);
                    this.carModel = {
                        engineId: this.post.car?.engine?.id,
                        transmissionId: this.post.car?.transmission?.id,
                        traction: this.post.car?.tractionType,
                        color: this.post.car?.color
                    }
                },
                error: (error) => {
                    this.router.navigate([`./404`]);
                },
            });
        }
    }

    private getEngines() {
        this.engineService.getAllEngines().subscribe({
            next: (response) => {
                this.engines = response;
                this.enginesLoaded = !this.enginesLoaded;
            },
        });
    }
    private getTransmissions() {
        this.transmissionService.getAllTransmissions().subscribe({
            next: (response) => {
                this.transmissions = response;
                this.transmisionsLoaded = !this.transmisionsLoaded;
            },
        });
    }

    private manageRouting() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });

        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get("id");
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

    buyOnline() {
        if (this.post) {
            this.post.car.available = 1;
        }
        const dialogRef = this.dialog.open(BuyOnlineDialogComponent, {
            data: { post: this.post },
        });

        dialogRef.afterClosed().subscribe((response) => {
            if (response) {
                this._snackBar.open(response, "OK");
            }
        });
    }

    engineChange(event: any) {
        if (this.post) {
            this.post.car.engine = this.engines.filter((eng) => eng.id == event.value)[0];
        }
    }
    transmissionChange(event: any) {
        if (this.post) {
            this.post.car.transmission = this.transmissions.filter((trm) => trm.id == event.value)[0];
        }
    }
    tractionChange(event: any) {
        if (this.post) {
            this.post.car.tractionType = event.value;
        }
    }
    colorChange(event: any) {
        if (this.post) {
            this.post.car.color = event.value;
        }
    }
}
