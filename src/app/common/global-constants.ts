import { HttpClient, HttpHeaders } from '@angular/common/http';
export class GlobalConstants {
  public static apiURL = 'http://localhost:3000/api/v1';

  public static tokenHeader = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    })
  };
}
