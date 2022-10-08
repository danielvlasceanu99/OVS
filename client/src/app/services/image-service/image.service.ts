import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Image } from "src/app/models/image.model";
import { Post } from "src/app/models/post.model";

@Injectable({
    providedIn: "root",
})
export class ImageService {
    IMAGE_URL: string = "http://localhost:8085/api/v1/image";

    constructor(private httpClient: HttpClient) {}

    getAllImage(): Observable<Image[]> {
        return this.httpClient.get<any[]>(`${this.IMAGE_URL}`).pipe(
            map((response) => {
                let aux: Image[] = [];
                response.map((item) => {
                    if (!item.post?.id) {
                        if (item.post) {
                            item.post = aux.find((img) => img.post?.id === +item.post)?.post;
                        }
                    } else {
                        aux.push(item);
                    }
                });
                return response;
            })
        );
    }

    getImageById(id: number): Observable<Image> {
        return this.httpClient.get<Image>(`${this.IMAGE_URL}/${id}`);
    }

    insertImage(image: Image): Observable<any> {
        return this.httpClient.post<any>(`${this.IMAGE_URL}`, image);
    }

    updateImage(image: Image): Observable<any> {
        return this.httpClient.put<any>(`${this.IMAGE_URL}/${image.id}`, image);
    }

    deleteImage(id: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.IMAGE_URL}/${id}`);
    }
}
