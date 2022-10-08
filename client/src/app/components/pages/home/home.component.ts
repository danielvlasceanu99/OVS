import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Post } from "src/app/models/post.model";
import { PostService } from "src/app/services/post-service/post.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    panelOpenState: boolean = false;
    searchText: string = "";

    posts: Post[] = [];
    pageIndex: number = 0;
    count: number = 0;

    constructor(private homeService: PostService) {}

    ngOnInit(): void {
        this.getPosts();
        this.homeService.getPostCount().subscribe((response) => {
            this.count = response;
        });
    }

    getPosts() {
        this.homeService.getPosts(this.pageIndex).subscribe((response) => {
            this.posts = response.posts.content;
        });
    }

    onPageChange(event: PageEvent) {
        event.previousPageIndex ? (this.pageIndex += event.pageIndex - event.previousPageIndex) : this.pageIndex++;
        if (this.searchText === "") {
            this.getPosts();
        } else {
            this.filterPosts();
        }
    }

    filterPosts() {
        this.homeService.geFilteredPosts(this.pageIndex, this.searchText).subscribe((response) => {
            console.log(response);
            this.posts = response.posts.response;
            this.count = response.posts.count;
        });
    }
}
