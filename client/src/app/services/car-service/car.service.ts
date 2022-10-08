import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  CAR_URL: string = 'http://localhost:8085/api/v1/car';

  constructor(private httpClient: HttpClient) {}

  getCarById(id: number): Observable<Car> {
    return this.httpClient.get<Car>(`${this.CAR_URL}/${id}`);
  }

  getAllCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${this.CAR_URL}`);
  }

  insertCar(car: Car): Observable<any> {
    return this.httpClient.post<any>(`${this.CAR_URL}`, car);
  }

  updateCar(car: Car): Observable<any> {
    return this.httpClient.put<any>(`${this.CAR_URL}/${car.id}`, car);
  }

  deleteCar(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.CAR_URL}/${id}`);
  }
}
