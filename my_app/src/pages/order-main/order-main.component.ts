import { Component, OnInit,} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-main',
  templateUrl: './order-main.component.html',
  styleUrls: ['./order-main.component.css']
})
export class OrderMainComponent implements OnInit {
  pizzasData: any[] = [];
  drinksData: any[] = [];
  dessertsData: any[] = [];
  piadinasData: any[] = [];
  saladsData: any[] = [];
  soupsData:any[] = [];
  pastasData:any[] = [];
  error: string = '';
  orderData: any[] = [];
  orderDataLength: number = 0;

  scrollTo(element: HTMLElement): void {
      element.scrollIntoView({ behavior: 'smooth' , block: 'start'});
  }
 
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.http.get<any[]>('http://localhost:3000/api/data').subscribe(
      (data) => {
        this.pizzasData = data.filter((item) => item.option === 'Pizza');
        this.drinksData = data.filter((item) => item.option === 'Ital');
        this.dessertsData = data.filter((item) => item.option === 'Desszert');
        this.piadinasData = data.filter((item) => item.option === 'Piadina');
        this.saladsData = data.filter((item) => item.option === 'Salata');
        this.soupsData = data.filter((item) => item.option === 'Leves');
        this.pastasData = data.filter((item) => item.option === 'Teszta');
      },
      (error) => {
        this.error = 'Hiba történt az adatok betöltése közben.';
        console.error(error);
      }
    );
  }

  saveToCart(name: string, component: string, image: string, price: string){
    const newItem = {
      name: name,
      component: component,
      file: image,
      price: price
    };
    this.orderData.push(newItem);
    this.calculateOrderDataLength()
    console.log(this.orderData);
  }

  calculateOrderDataLength() {
    this.orderDataLength = this.orderData.length;
    console.log(this.orderDataLength)
  }


}
