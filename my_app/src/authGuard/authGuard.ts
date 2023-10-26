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

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/admin/login']);
      return false;
    }
  }

  login() {
    if(localStorage.getItem('currentUser')){
    }
  }

  logout(){
    localStorage.removeItem('currentUser')
  }
}