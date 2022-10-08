import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { ElectricEngine } from 'src/app/models/electric-engine.model';

@Injectable({
  providedIn: 'root'
})

export class ElectricEngineService {
  ELECTRIC_ENGINE_URL: string = 'http://localhost:8085/api/v1/electric_engine';

  constructor(private httpClient: HttpClient) {}

  getElectricEngineById(id: number): Observable<ElectricEngine> {
    return this.httpClient.get<ElectricEngine>(`${this.ELECTRIC_ENGINE_URL}/${id}`);
  }

  getAllElectricEngines(): Observable<ElectricEngine[]> {
    return this.httpClient.get<ElectricEngine[]>(`${this.ELECTRIC_ENGINE_URL}`);
  }

  insertElectricEngine(electricEngine: ElectricEngine): Observable<any> {
    return this.httpClient.post<any>(`${this.ELECTRIC_ENGINE_URL}`, electricEngine);
  }

  updateElectricEngine(electricEngine: ElectricEngine): Observable<any> {
    return this.httpClient.put<any>(`${this.ELECTRIC_ENGINE_URL}/${electricEngine.id}`, electricEngine);
  }

  deleteElectricEngine(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.ELECTRIC_ENGINE_URL}/${id}`);
  }
}