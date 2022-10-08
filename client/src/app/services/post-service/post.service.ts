import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Post } from "src/app/models/post.model";

@Injectable({
    providedIn: "root",
})
export class PostService {
    POST_URL: string = "http://localhost:8085/api/v1/post";

    constructor(private httpClient: HttpClient) {}

    getAllPosts(): Observable<Post[]> {
        return this.httpClient.get<Post[]>(this.POST_URL + "/get");
    }

    geFilteredPosts(pageNo: number = 0, query: string, pageSize: number = 9) {
        const options = {
            observe: "response" as "body",
            params: {
                pageNo: pageNo,
                pageSize: pageSize,
                query: query,
            },
        };

        return this.httpClient.get<HttpResponse<any>>(this.POST_URL + "/search", options).pipe(
            map((response) => {
                return {
                    posts: response.body,
                };
            })
        );
    }

    getPosts(pageNo: number = 0, pageSize: number = 9) {
        const options = {
            observe: "response" as "body",
            params: {
                pageNo: pageNo,
                pageSize: pageSize,
            },
        };

        return this.httpClient.get<HttpResponse<any>>(this.POST_URL, options).pipe(
            map((response) => {
                return {
                    posts: response.body,
                };
            })
        );
    }

    getPostCount(): Observable<number> {
        return this.httpClient.get<number>(`${this.POST_URL}/element`);
    }

    getPostById(id: number) {
        return this.httpClient.get<Post>(`${this.POST_URL}/${id}`);
    }

    insertPost(post: Post): Observable<any> {
        return this.httpClient.post<any>(this.POST_URL, post);
    }

    deletePost(id: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.POST_URL}/${id}`);
    }

    updatePost(post: Post): Observable<any> {
        return this.httpClient.put<any>(`${this.POST_URL}/${post.id}`, post);
    }
}
