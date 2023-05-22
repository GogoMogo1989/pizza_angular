import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent {

  userName: string="";
  password: string="";
  secretKey: string="";
  realSecretKey = 'Password12345'

  constructor(private http: HttpClient, private router: Router){}

  onSubmit() {
    this.http.post('http://localhost:3000/admin/signup', {userName: this.userName, password:this.password })
      .subscribe(
        success => {
          if(this.secretKey === this.realSecretKey){
              console.log('Bejelentkezés sikeres!', success);
              alert('Regisztráció sikeres!')
              this.router.navigate(['/adminlogin'])
            } else {
              console.log('A titkos kulcs nem egyezzik')
              alert('A titkos kulcs nem egyezzik')
            }
          },
          error => {
            console.log('Hiba történt a regisztráció során: ', error);
            alert("Regisztráció sikertelen")
          }
      );
  }
}
