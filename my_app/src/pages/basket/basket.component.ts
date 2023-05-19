import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  storedOrderData: any[] = [];
  totalPrice: number = 0;
  orderForm: FormGroup;

  constructor() {

    const storedData = localStorage.getItem('orderData');
    if (storedData) {
      this.storedOrderData = JSON.parse(storedData);
      this.calculateTotalPrice()
    }

    this.orderForm = new FormGroup({
      name: new FormControl(''),
      city: new FormControl(''),
      zip: new FormControl(''),
      street: new FormControl(''),
      houseNumber: new FormControl(''),
      floor: new FormControl(''),
      door: new FormControl(''),
      phoneNumber: new FormControl('')
    });

  }

  removeFromCart(item: any) {
    const index = this.storedOrderData.indexOf(item);
    if (index !== -1) {
      this.storedOrderData.splice(index, 1);
      this.refreshStoredOrderData();
      this.calculateTotalPrice()
    }
  }
  
  refreshStoredOrderData() {
    this.storedOrderData = [...this.storedOrderData];
  }

  calculateTotalPrice() {
    this.totalPrice = this.storedOrderData.reduce((sum, item) => sum + Number(item.price), 0);
    console.log(this.totalPrice)
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const orderData = {
        file: this.storedOrderData[0].file,
        component: this.storedOrderData[0].component,
        name: this.storedOrderData[0].name,
        totalPrice: this.totalPrice,
        formValues: this.orderForm.value
      };
      console.log(orderData);
    }
  }

}