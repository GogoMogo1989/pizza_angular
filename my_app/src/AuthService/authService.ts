import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) {}
  
    login(userName: string, password: string) {
        localStorage.setItem('currentUser', JSON.stringify(userName));
        return this.http.post<any>('http://localhost:3000/admin/login', { userName, password })
    }

    isLoggedIn(): boolean {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser !== null;
      }
    
}