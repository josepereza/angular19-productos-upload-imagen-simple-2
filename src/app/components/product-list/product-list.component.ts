import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) {

  }
  get products() {
    return this.productService.productsSignal;
  }

  ngOnInit(): void {
    this.productService.getProducts();
  }
}