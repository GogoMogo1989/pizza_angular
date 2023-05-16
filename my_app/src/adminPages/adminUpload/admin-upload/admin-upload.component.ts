import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-upload',
  templateUrl: './admin-upload.component.html',
  styleUrls: ['./admin-upload.component.css']
})
export class AdminUploadComponent implements OnInit {
  name!: string;
  component!: string;
  price!: string;
  uploadedData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData(); // Adatok lekérése a komponens inicializálásakor
  }

  uploadButton() {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    const file = fileInput.files && fileInput.files[0]; // Ellenőrizzük, hogy a file nem-e null-e

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        console.log(base64String)

        const data = {
          file: base64String,
          name: this.name,
          component: this.component,
          price: this.price
        };

        this.http.post('http://localhost:3000/api/data', data).subscribe(
          response => {
            console.log('Adatok feltöltése sikeres!', response);
            this.fetchData(); // Frissítjük az adatokat a feltöltés után
          },
          error => {
            console.error('Adatok feltöltése sikertelen.', error);
            this.fetchData();
            this.name = "";
            this.price ="";
            this.component=""
          }
        );
      };

      reader.readAsDataURL(file);
    }
  }

  fetchData() {
    this.http.get('http://localhost:3000/api/data').subscribe(
      response => {
        console.log('Adatok lekérése sikeres!', response);
        this.uploadedData = response as any[]; // Feltöltött adatokat mentjük
      },
      error => {
        console.error('Adatok lekérése sikertelen.', error);
      }
    );
  }

  deleteButton(id: string) {
    if (confirm('Biztosan törölni szeretnéd az adatot?')) {
      this.http.delete(`http://localhost:3000/api/data/${id}`).subscribe(
        response => {
          console.log('Az adat törlése sikeres volt!', response);
          this.fetchData(); // Frissítjük az adatokat a törlés után
        },
        error => {
          console.error('Az adat törlése sikertelen.', error);
        }
      );
    }
  }

  
}
