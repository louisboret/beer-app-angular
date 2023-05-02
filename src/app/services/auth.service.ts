import { Injectable, OnInit } from '@angular/core';
import { Beer } from '../models/beer';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseApiUrl = 'https://localhost:5001/api/';
  private token = new BehaviorSubject<string>('');

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(this.baseApiUrl + 'users/login', {
      email: credentials.email,
      password: credentials.password
    }, this.httpOptions);
  }
}
