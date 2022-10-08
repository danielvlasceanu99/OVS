import { Post } from "./post.model";

export interface Image {
    id: number;
    imageUrl?: string;
    post?: Post;
    postId?: number;
}
