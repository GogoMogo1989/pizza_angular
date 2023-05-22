import { Component } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/AuthService/authService';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  userName: string="";
  password: string="";

  constructor( private router: Router, private http : HttpClient, private authService: AuthService) { }

  onSubmit() {
    this.authService.login(this.userName, this.password)
      .subscribe(
        success => {
          if (success) {
            console.log('Bejelentkezés sikeres!');
            this.router.navigate(['/adminmain']);
          } else {
            console.log('Hibás felhasználó név vagy jelszó!');
          }
        },
        error => {
          console.log('Hiba történt a bejelentkezés során: ', error);
          alert("Hibás felhasználónév, vagy jelszó!")
        }
      );
  }

}
