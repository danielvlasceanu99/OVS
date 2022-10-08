import { Post } from "./post.model";
import { User } from "./user.model";

export interface Transaction {
    id?: number;
    post?: Post;
    postId?: number;
    user?: User;
    userId?: number;
    date: Date;
    price: number;
}