import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public products = signal<Product[]>([]);

  constructor(private http: HttpClient) {}

  getProducts() {
    this.http.get<Product[]>('http://localhost:3000/products').subscribe(data => {
      this.products.set(data);
    });
  }

  createProduct(product: FormData) {
    return this.http.post<Product>('http://localhost:3000/products', product);
  }

  get productsSignal() {
    return this.products();
  }
}