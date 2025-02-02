import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {}

  login(email: String, password: String) {
    return this.httpClient.post<LoginResponse>("/login", {email, password}).pipe(
      tap((value) => {
            sessionStorage.setItem("auth-token", value.token)
            sessionStorage.setItem("email", value.email)
      }
    ))

  }
}
