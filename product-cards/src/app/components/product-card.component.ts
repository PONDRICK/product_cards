import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  products: any[] = [];
  skip = 0;
  limit = 30;
  loading = false;
  isBrowser = false;

  constructor(
    private productService: ProductService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.loadProducts();
    if (this.isBrowser) {
      window.addEventListener('scroll', this.onScroll);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  loadProducts(): void {
    if (this.loading) return;
    this.loading = true;

    this.productService.getProducts(this.limit, this.skip).subscribe((res) => {
      const newProducts = res.products.map((p: any) => ({
        ...p,
        showComments: false,
      }));
      this.products = [...this.products, ...newProducts];
      this.skip += this.limit;
      this.loading = false;
    });
  }

  getStars(rating: number): string[] {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return [
      ...Array(full).fill('full'),
      ...(half ? ['half'] : []),
      ...Array(empty).fill('empty'),
    ];
  }

  toggleComments(product: any): void {
    product.showComments = !product.showComments;
  }

  onScroll = (): void => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      this.loadProducts();
    }
  };
}
