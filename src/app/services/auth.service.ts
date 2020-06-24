import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(formAttributes) {
    this.http
      .post('localhost:3000/api/v1/users', formAttributes)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
