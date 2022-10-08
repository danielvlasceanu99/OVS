import { Car } from "./car.model";
import { Image } from "./image.model";

export interface Post {
    id: number;
    title: string;
    description: string;
    price: number;
    car: Car;
    carId?: number;
    images?: Image[];
}
