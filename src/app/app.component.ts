import { Component } from '@angular/core';
import { LocalstorageService } from './services/localstorage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ticketingapp-frontend';

  username = '';
  email = '';
  token = '';


  constructor(private router: Router, private route: ActivatedRoute ) {
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
    this.token = localStorage.getItem('token');

  }

  signout() {
    // sign out.
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('token');

    // this.theroute.navigate(['/login', this.agent.id], { relativeTo: this.route });
    this.router.navigate(['/login'], { relativeTo: this.route });

    // refresh the page
    window.location.reload();

  }
}
