import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Post } from "src/app/models/post.model";

@Component({
    selector: "app-post",
    templateUrl: "./post.component.html",
    styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
    @Input() post: Post | null = null;
    url: string = "";

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.post?.images?.sort((a, b) => a.id - b.id);
        this.url = "../../../../assets/images/caravatar.png";
        //   this.post?.images != undefined && this.post?.images?.length > 0
        //     ? 'http://localhost:8085/api/v1/file/' +
        //       this.post?.images[0].imageUrl
        //     : '../../../../assets/images/caravatar.png';
    }

    moreDetails() {
        this.router.navigate([`./details/${this.post?.id}`]);
    }

    configure() {
        this.router.navigate([`./conf/${this.post?.id}`]);
    }
}
