import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent {

  error: string = '';
  datas: any[] = []
/*   allNames: string = '';
  name: string = '';
  city: string = '';
  zip: string = '';
  street: string = '';
  houseNumber: string = '';
  floor: string = '';
  door: string = '';
  phoneNumber: string = '';
  _id: string= "" */
 
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.http.get<any[]>('http://localhost:3000/api/data/order').subscribe(
      (data) => {
        const orders = data.map((order) => ({
          allNames: order.allNames,
          name: order.name,
          city: order.city,
          zip: order.zip,
          street: order.street,
          houseNumber: order.houseNumber,
          floor: order.floor,
          door: order.door,
          phoneNumber: order.phoneNumber,
          _id: order._id
        }));
        this.datas = orders;
      },
      (error) => {
        this.error = 'Hiba történt az adatok betöltése közben.';
        console.error(error);
      }
    );
  }
  
  

}
