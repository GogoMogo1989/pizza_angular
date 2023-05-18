import { Component, OnInit } from '@angular/core';
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
  pastasData:any[] = []

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPizzaData()
    this.loadDrinkData()
    this.loadDessertData()
    this.loadPiadinasData()
    this.loadSaladsData()
    this.loadSoupsData()
    this.loadPastasData()
  }

  loadPizzaData() {
    this.http.get<any[]>('http://localhost:3000/api/data').subscribe(data => {
      this.pizzasData = data.filter(item => item.option === 'Pizza');
      console.log(this.pizzasData)
    });
  }

  loadDrinkData() {
    this.http.get<any[]>('http://localhost:3000/api/data').subscribe(data => {
      this.drinksData = data.filter(item => item.option === 'Ital');
    });
  }

  loadDessertData() {
    this.http.get<any[]>('http://localhost:3000/api/data').subscribe(data => {
      this.dessertsData = data.filter(item => item.option === 'Desszert');
    });
  }

  loadPiadinasData() {
    this.http.get<any[]>('http://localhost:3000/api/data').subscribe(data => {
      this.piadinasData = data.filter(item => item.option === 'Piadina');
    });
  }

  loadSaladsData() {
    this.http.get<any[]>('http://localhost:3000/api/data').subscribe(data => {
      this.saladsData = data.filter(item => item.option === 'Salata');
    });
  }

  loadSoupsData() {
    this.http.get<any[]>('http://localhost:3000/api/data').subscribe(data => {
      this.soupsData = data.filter(item => item.option === 'Leves');
    });
  }

  loadPastasData() {
    this.http.get<any[]>('http://localhost:3000/api/data').subscribe(data => {
      this.pastasData = data.filter(item => item.option === 'Teszta');
    });
  }


}
