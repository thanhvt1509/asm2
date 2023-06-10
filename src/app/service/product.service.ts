import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api = 'http://localhost:3000/products'
  constructor(
    private http: HttpClient
  ) { }
  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api}`)
  }
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`)
  }
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.api}`, product)
  }
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}/${product.id}`, product)
  }
  removeProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.api}/${id}`)
  }
}
