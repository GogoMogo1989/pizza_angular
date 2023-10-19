import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})

export class BasketComponent implements OnInit {

  storedOrderData: any[] = [];
  totalPrice: number = 0;
  orderForm: FormGroup;
  allNames: string = ''
  name: string = '';
  city: string = '';
  zip: string = '';
  street: string = '';
  houseNumber: string = '';
  floor: string = '';
  door: string = '';
  phoneNumber: string = '';
  loginUserData: any[] = [];
  error: string= "";
  orderDataLength: number = 0;

  constructor(private http: HttpClient) {

    const storedData = localStorage.getItem('orderData');
      if (storedData) {
        this.storedOrderData = JSON.parse(storedData);
        this.calculateTotalPrice();
        this.getAllNames();
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

    this.orderForm.valueChanges.subscribe((values) => {
      this.name = values.name;
      this.city = values.city;
      this.zip = values.zip;
      this.street = values.street;
      this.houseNumber = values.houseNumber;
      this.floor = values.floor;
      this.door = values.door;
      this.phoneNumber = values.phoneNumber;
    });
  }

  ngOnInit(): void {
    this.calculateOrderDataLength()
  }

  calculateOrderDataLength() {
    this.orderDataLength = this.storedOrderData.length;
    console.log(this.orderDataLength)
  }

  removeFromCart(item: any) {
    const index = this.storedOrderData.indexOf(item);
    if (index !== -1) {
      this.storedOrderData.splice(index, 1);
      this.refreshStoredOrderData();
      this.calculateTotalPrice();
    }
  }
  
  refreshStoredOrderData() {
    this.storedOrderData = [...this.storedOrderData];
    localStorage.setItem('orderData', JSON.stringify(this.storedOrderData));
  }

  calculateTotalPrice() {
    this.totalPrice = this.storedOrderData.reduce((sum, item) => sum + Number(item.price), 0);
    console.log(this.totalPrice);
  }

  getAllNames() {
    this.allNames = this.storedOrderData.map((order) => `${order.name} ${order.number} db`).join(', ');;
    console.log(this.allNames);
  }



  onSubmit() {
    const orderData = {
      totalPrice: this.totalPrice,
      allNames: this.allNames,
      name: this.name,
      city: this.city,
      zip: this.zip,
      street: this.street,
      houseNumber: this.houseNumber,
      floor: this.floor,
      door: this.door,
      phoneNumber: this.phoneNumber,
    }
  
    this.http.post('http://localhost:3000/api/data/order', orderData)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error('Adatok feltöltése sikertelen.', error);
          this.storedOrderData = [];
          this.orderForm.reset(); 
          this.totalPrice = 0;
          localStorage.removeItem('orderData');
          alert("Sikeres Rendelés!");
          localStorage.removeItem('email')
        }
      );
  }

  loadData() {
    const currentUserEmail = localStorage.getItem('email');
  
    this.http.get<any[]>('http://localhost:3000/user/data').subscribe(
      (data) => {
        const currentUserData = data.find((order) => order.email === currentUserEmail);
  
        if (currentUserData) {
          this.loginUserData = [{
            email: currentUserData.email,
            password: currentUserData.password,
            checkboxFormControl: currentUserData.checkboxFormControl,
            name: currentUserData.name,
            phoneNumber: currentUserData.phoneNumber,
            city: currentUserData.city,
            zip: currentUserData.zip,
            street: currentUserData.street,
            houseNumber: currentUserData.houseNumber,
            floor: currentUserData.floor,
            door: currentUserData.door,
          }];
          this.orderForm.patchValue(this.loginUserData[0]);
        } else {
          alert("Kérlek jelentkezz be a cím betöltéséhez!")
        }
        console.log(this.loginUserData);
      },
      (error) => {
        this.error = 'Hiba történt az adatok betöltése közben.';
        console.error(error);
      }
    );
  }

}

