import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  ORDER_URL: string = "http://localhost:8085/api/v1/transaction";
    
  constructor(private httpClient: HttpClient) {}

  getAllOrders() {
    return this.httpClient.get<Transaction[]>(this.ORDER_URL);
  }

  getOrderById(id: number): Observable<Transaction> {
    return this.httpClient.get<Transaction>(`${this.ORDER_URL}/${id}`);
  }

  getOrderByUserId(id: number): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(
      `${this.ORDER_URL}/user-id/${id}`
    );
  }

  insertOrder(order: Transaction): Observable<any> {
    return this.httpClient.post<any>(this.ORDER_URL, order);
  }
    
  updateOrder(transaction: Transaction): Observable<Transaction> {
    return this.httpClient.put<Transaction>(`${this.ORDER_URL}`, transaction);
  }
    
  deleteOrder(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.ORDER_URL}/${id}`);
  }
}
