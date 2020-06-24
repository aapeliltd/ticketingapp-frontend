import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from './../common/global-constants';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = GlobalConstants.apiURL;

  constructor(private http: HttpClient, private storage: LocalstorageService) {}

  register(data) {
    return this.http.post(this.apiUrl + '/users', data);
  }

  login(data) {
    return this.http.post(this.apiUrl + '/login', data);
  }

}
