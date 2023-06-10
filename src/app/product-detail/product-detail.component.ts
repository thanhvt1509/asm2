import { Component } from '@angular/core';
import { Product } from '../interface/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product!: Product
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.route.paramMap.subscribe((param) => {
      const id = String(param.get('id'))
      this.productService.getProductById(id).subscribe(
        (product) => this.product = product,
        (error) => alert('Không tìm thấy sản phẩm')
      )
    })
  }
}
