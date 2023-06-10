import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../interface/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] = []
  constructor(
    private productService: ProductService
  ) {
    this.productService.getProduct().subscribe(
      (data) => this.products = data,
      (error) => alert('Không tìm thấy sản phẩm')
    )
  }
  removeProduct(id: string) {
    const cf = confirm('Bạn có muốn xóa sản phẩm này không ?')
    if (cf == true) {
      this.productService.removeProduct(id).subscribe(() => {
        this.products = this.products.filter(p => p.id != id)
      })
    }
  }
}
