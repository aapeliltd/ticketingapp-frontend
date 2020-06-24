import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from './../common/global-constants';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  apiUrl = GlobalConstants.apiURL;
  public tokenHeader = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {}

  getCustomerTickets() {
    const userId = localStorage.getItem('id');
    return this.http.get(this.apiUrl + '/users/' + userId + '/tickets', this.tokenHeader);
  }

  getAllTickets() {
    return this.http.get(this.apiUrl + '/tickets');
  }
}
