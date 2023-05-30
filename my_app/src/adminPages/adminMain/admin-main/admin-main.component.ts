import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent {

  error: string = '';
  datas: any[] = []
 
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

  
  deleteButton(id: string) {
    if (confirm('Biztosan törölni szeretnéd a rendelést?')) {
      this.http.delete(`http://localhost:3000/api/data/order/${id}`).subscribe(
        response => {
          console.log('Az adat törlése sikeres volt!', response);
          this.loadData()
        },
        error => {
          console.error('Az adat törlése sikertelen.', error);
        }
      );
    }
  }

}
