export interface FuelEngine {
    id: number;
    fuelConsumption: number;
    co2Emissions: number;
    displacement: number;
    numberOfCylinders: number;
    hasTurbine: boolean;
    hasSupercharge: boolean;
    fuelType: FuelType;
    engineLayout: EngineLayout;
    strokeType: StrokeType;
}

export enum FuelType {
    GASOLINE = "GASOLINE",
    DIESEL = "DIESEL",
    LPG = "LPG",
    METHANOL = "METHANOL",
    ETHANOL = "ETHANOL",
}

export enum EngineLayout {
    INLINE = "INLINE",
    V = "V",
    VR = "VR",
    W = "W",
    H = "H",
    U = "U",
    ROTARY = "ROTARY",
    BOXER = "BOXER",
}

export enum StrokeType {
    TWO_STROKE = "TWO_STROKE",
    FOUR_STROKE = "FOUR_STROKE",
}
