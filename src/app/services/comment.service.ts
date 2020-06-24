import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from './../common/global-constants';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  apiUrl = GlobalConstants.apiURL;
  tokenHeader = GlobalConstants.tokenHeader;

  constructor(private http: HttpClient) {}

  addComment(data, ticketId) {
    return this.http.post(
      this.apiUrl + '/ticket/' + ticketId + '/comments',
      data,
      this.tokenHeader
    );
  }
}
