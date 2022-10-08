import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Engine } from "src/app/models/engine.model";

@Injectable({
    providedIn: "root",
})
export class EngineService {
    ENGINE_URL: string = "http://localhost:8085/api/v1/engine";

    constructor(private httpClient: HttpClient) {}

    getAllEngines() {
        return this.httpClient.get<Engine[]>(this.ENGINE_URL);
    }

    getEngineById(id: number): Observable<Engine> {
        return this.httpClient.get<Engine>(`${this.ENGINE_URL}/${id}`);
    }

    insertEngine(engine: Engine): Observable<any> {
        return this.httpClient.post<any>(`${this.ENGINE_URL}`, engine);
    }

    updateEngine(engine: Engine): Observable<any> {
        return this.httpClient.put<any>(`${this.ENGINE_URL}/${engine.id}`, engine);
    }

    deleteEngine(id: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.ENGINE_URL}/${id}`);
    }
}
