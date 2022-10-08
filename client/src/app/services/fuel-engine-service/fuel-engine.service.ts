import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FuelEngine } from "src/app/models/fuel-engine.model";

@Injectable({
    providedIn: "root",
})
export class FuelEngineService {
    FUEL_ENGINE_URL: string = "http://localhost:8085/api/v1/fuel-engine";

    constructor(private httpClient: HttpClient) {}

    getFuelEngineById(id: number): Observable<FuelEngine> {
        return this.httpClient.get<FuelEngine>(`${this.FUEL_ENGINE_URL}/${id}`);
    }

    getAllFuelEngines(): Observable<FuelEngine[]> {
        return this.httpClient.get<FuelEngine[]>(`${this.FUEL_ENGINE_URL}`);
    }

    insertFuelEngine(fuelEngine: FuelEngine): Observable<any> {
        return this.httpClient.post<any>(`${this.FUEL_ENGINE_URL}`, fuelEngine);
    }

    updateFuelEngine(fuelEngine: FuelEngine): Observable<any> {
        return this.httpClient.put<any>(`${this.FUEL_ENGINE_URL}/${fuelEngine.id}`, fuelEngine);
    }

    deleteFuelEngine(id: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.FUEL_ENGINE_URL}/${id}`);
    }
}
