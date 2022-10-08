import { Engine } from "./engine.model";
import { Transmission } from "./transmission.model";

export interface Car {
    id: number;
    brand: string;
    model: string;
    available: number;
    manufacturingYear: number;
    engine?: Engine;
    engineId?: number;
    transmission?: Transmission;
    transmissionId?: number;
    numberOfDoors: number;
    color: string;
    carType: CarType;
    tractionType: TractionType;
}

export enum CarType {
    SEDAN = "SEDAN",
    COUPE = "COUPE",
    SPORTS = "SPORTS",
    WAGON = "WAGON",
    HATCHBACK = "HATCHBACK",
    CONVERTIBLE = "CONVERTIBLE",
    SUV = "SUV",
    MINIVAN = "MINIVAN",
    VAN = "VAN",
    PICKUPTRUCK = "PICKUPTRUCK",
}

export enum TractionType {
    AWD = "AWD",
    FWD = "FWD",
    RWD = "RWD",
}
