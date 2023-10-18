import { Component } from '@angular/core';
import { Location } from '@angular/common';



@Component({
  selector: 'app-product-detail-dialog-component',
  templateUrl: './product-detail-dialog-component.component.html',
  styleUrls: ['./product-detail-dialog-component.component.css']
})
export class ProductDetailDialogComponent {
  data: { name: string; file: string; component: string; price: number; number: number; } | undefined;
  orderData: any[] = [];
  orderDataLength: number = 0;

  constructor(private location: Location) {
    const state = history.state;
    if (state && state.data) {
      this.data = state.data;
      console.log(this.data)
    }
  }

  goBack(): void {
    this.location.back(); 
  }

  calculateOrderDataLength() {
    this.orderDataLength = this.orderData.length;
    console.log(this.orderDataLength)
  }
  
  saveToCart(name: string | undefined, component: string | undefined, image: string| undefined, price: number| undefined, number: number| undefined){
    const newItem = {
      name: name,
      component: component,
      file: image,
      price: price,
      number: number,
    };
    this.orderData.push(newItem);
    this.calculateOrderDataLength()
    this.saveOrderDataToLocalStorage()
    console.log(this.orderData);
  }
  
  saveOrderDataToLocalStorage() {
    localStorage.setItem('orderData', JSON.stringify(this.orderData));
  }

  decrementQuantity() {
    if (this.data?.number && this.data.number > 0) {
      this.data.number--;
      this.calculateOrderDataLength();
      this.saveToCart(this.data.name, this.data.component, this.data.file, this.data.price, this.data.number);
    }
  }

  incrementQuantity() {
    if (this.data?.number) {
      this.data.number++;
      this.calculateOrderDataLength();
      this.saveToCart(this.data.name, this.data.component, this.data.file, this.data.price, this.data.number);
    }
  }

}
