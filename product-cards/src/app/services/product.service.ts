import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products?limit=30';

  constructor(private http: HttpClient) {}

  getProducts(limit: number = 30, skip: number = 0): Observable<any> {
    return this.http.get(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
  }
}
