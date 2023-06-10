import { Component } from '@angular/core';
import { Product } from '../interface/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent {
  product!: Product
  productForm!: FormGroup
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.productForm = this.formBuilder.group({
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
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id')
      if (id) {
        this.productService.getProductById(id).subscribe(
          (data) => {
            this.product = data,
              this.productForm.patchValue({
                name: this.product.name,
                price: this.product.price,
                desc: this.product.desc
              })
          },
          (error) => alert('Không tìm thấy sản phẩm')
        )
      }
    })
  }
  updateProduct() {
    const updatedProduct: Product = {
      ...this.product,
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      desc: this.productForm.value.desc,
    }
    this.productService.updateProduct(updatedProduct).subscribe(
      (product) => alert('Sửa sản phẩm thành công'),
      (error) => alert('Sửa sản phẩm thất bại')
    )
  }
}
