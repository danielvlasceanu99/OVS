import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Transmission } from "src/app/models/transmission.model";

@Injectable({
    providedIn: "root",
})
export class TransmissionService {
    TRANSMISSION_URL: string = "http://localhost:8085/api/v1/transmission";

    constructor(private httpClient: HttpClient) {}

    getAllTransmissions() {
        return this.httpClient.get<Transmission[]>(this.TRANSMISSION_URL);
    }

    getTransmissionById(id: number): Observable<Transmission> {
        return this.httpClient.get<Transmission>(`${this.TRANSMISSION_URL}/${id}`);
    }

    insertTransmission(transmission: Transmission): Observable<any> {
        return this.httpClient.post<any>(`${this.TRANSMISSION_URL}`, transmission);
    }

    updateTransmission(transmission: Transmission): Observable<any> {
        return this.httpClient.put<any>(`${this.TRANSMISSION_URL}/${transmission.id}`, transmission);
    }

    deleteTransmission(id: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.TRANSMISSION_URL}/${id}`);
    }
}
