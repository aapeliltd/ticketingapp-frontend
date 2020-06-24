import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor(private route: ActivatedRoute, private router: Router) {}

  save(key, value) {
    if (value) {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, null);
    }
  }

  remove(key) {
    localStorage.removeItem(key);
  }

  get(key) {
    return localStorage.getItem(key);
  }
  checkIfLoggedIn() {
    const token = localStorage.getItem('token');
    if (token == null) {
      this.router.navigate(['/login'], { relativeTo: this.route });
    }
  }
}
