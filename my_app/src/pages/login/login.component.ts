import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string="";
  password: string="";

  constructor(private http : HttpClient, private router: Router){}

  onSubmit() {
    this.http.post<any>('http://localhost:3000/user/login', { email: this.email, password: this.password })
      .subscribe(
        success => {
          if (success) {
            console.log('Bejelentkezés sikeres!');
            alert('Sikeres belépés!')
            this.router.navigate(['/ordermain']);
          } else {
            console.log('Hibás felhasználónév vagy jelszó!');
          }
        },
        error => {
          console.log('Hiba történt a bejelentkezés során: ', error);
          alert("Hibás felhasználónév vagy jelszó!");
        }
      );
  }
}
