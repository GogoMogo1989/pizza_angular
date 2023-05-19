import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  storedOrderData: any[] = [];
  totalPrice: number = 0;
  orderForm: FormGroup;

  constructor(private http: HttpClient) {

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
    if (this.orderForm.valid && this.storedOrderData.length > 0) {
      const orderData = {
        orderData: this.storedOrderData.map((order) => ({
          file: order.file,
          component: order.component,
          name: order.name,
          totalPrice: this.totalPrice,
          formValues: this.orderForm.value
        }))
      };
  
      this.http.post('http://localhost:3000/api/data/order', orderData)
        .subscribe(
          response => {
            console.log('Adatok feltöltése sikeres!', response);
            localStorage.removeItem('orderData');
            this.storedOrderData = [];
            this.orderForm.reset();
            this.totalPrice = 0;
            alert('Sikeres rendelés!');
          },
          error => {
            console.error('Adatok feltöltése sikertelen.', error);
            localStorage.removeItem('orderData');
            this.storedOrderData = [];
            this.orderForm.reset();
            this.totalPrice = 0;
            alert('Sikeres rendelés!');
          }
        );
    }
  }
}