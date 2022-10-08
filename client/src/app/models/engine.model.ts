import { ElectricEngine } from "./electric-engine.model";
import { FuelEngine } from "./fuel-engine.model";

export interface Engine {
    id: number;
    electricEngine?: ElectricEngine;
    electricEngineId?: number;
    fuelEngine?: FuelEngine;
    fuelEngineId?: number;
    horsePower: number;
    torque: number;
}
