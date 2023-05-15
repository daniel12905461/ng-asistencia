import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) { 
    this.baseUrl = 'auth';
  }

  login(loginForm: any) {
    return this.http.post<any>(this.baseUrl+`/login`, loginForm, httpOptions);
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/auth/sign-in']);
  }
}
