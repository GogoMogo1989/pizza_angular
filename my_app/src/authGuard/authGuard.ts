import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from 'src/AuthService/authService';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  static logout() {
    throw new Error('Method not implemented.');
  }

  private isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/adminlogin']);
      return false;
    }
  }

  login() {
    if(localStorage.getItem('currentUser')){
      this.isLoggedIn = true;
    }
  }

  logout(){
    localStorage.removeItem('currentUser')
    this.isLoggedIn= false
  }
}