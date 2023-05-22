import { Component } from '@angular/core';
import { AuthGuard } from 'src/authGuard/authGuard';

@Component({
  selector: 'app-admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.css']
})
export class AdminToolbarComponent {

  constructor(private authGuard: AuthGuard) {}

  logout() {
    this.authGuard.logout();
  }

}