import { Component } from '@angular/core';
import { Location } from '@angular/common';



@Component({
  selector: 'app-product-detail-dialog-component',
  templateUrl: './product-detail-dialog-component.component.html',
  styleUrls: ['./product-detail-dialog-component.component.css']
})
export class ProductDetailDialogComponent {
  data: { name: string; file: string, component: string } | undefined;

  constructor(private location: Location) {
    const state = history.state;
    if (state && state.data) {
      this.data = state.data;
    }
  }

  goBack(): void {
    this.location.back(); 
  }
  
}
