import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  imports:[ReactiveFormsModule],
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent {
  imagePreview: string | ArrayBuffer | null = null;
 selectedFile!:File;
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: [null, Validators.required],
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.productForm.patchValue({ image: input.files[0] });
           this.selectedFile = input.files[0] ;

    }else {
      console.warn('No file selected.');
      this.productForm.patchValue({ image: null });
    }
    

    // Mostrar vista previa de la imagen
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
  

  onSubmit() {
    if (this.productForm.invalid) return;

    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('image', this.productForm.get('image')?.value);

    this.productService.createProduct(formData).subscribe({
      next: (product) => {
        console.log('Product created:', product);
        this.productService.getProducts();
        this.productForm.reset();
      },
      error: (err) => {
        console.error('Error creating product:', err);
      },
    });
  }
}