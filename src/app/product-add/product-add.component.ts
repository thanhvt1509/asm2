import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms'
import { ProductService } from '../service/product.service';
import { Product } from '../interface/product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  constructor(
    private formBuilder: UntypedFormBuilder,
    private productService: ProductService
  ) { }
  productForm = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255)
      ]
    ],
    price: [
      0,
      [
        Validators.required,
        Validators.min(0),
      ]
    ],
    desc: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255)
      ]
    ],
  })
  createProduct() {
    const product: Product = {
      id: '',
      name: this.productForm.value.name || '',
      price: this.productForm.value.price || 0,
      desc: this.productForm.value.desc || ''
    }
    this.productService.createProduct(product).subscribe(
      (product) => alert('Thêm sản phẩm thành công'),
      (error) => alert('Thêm sản phẩm thất bại')
    )
  }
}
