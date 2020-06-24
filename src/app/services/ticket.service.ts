import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from './../common/global-constants';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  apiUrl = GlobalConstants.apiURL;
  tokenHeader = GlobalConstants.tokenHeader;
  constructor(private http: HttpClient) {}

  getCustomerTickets() {
    const userId = localStorage.getItem('id');
    return this.http.get(
      this.apiUrl + '/users/' + userId + '/tickets',
      this.tokenHeader
    );
  }

  getAllTickets() {
    return this.http.get(this.apiUrl + '/tickets', this.tokenHeader);
  }

  addTicket(data) {
    return this.http.post(this.apiUrl + '/tickets', data, this.tokenHeader);
  }

  clostTicket(data) {
    return this.http.post(this.apiUrl + '/ticket/close', data, this.tokenHeader);
  }
}
