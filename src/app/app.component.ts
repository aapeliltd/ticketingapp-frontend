import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewTicketComponent } from './new-ticket/new-ticket.component';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public matDialog: MatDialog
  ) {
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
    this.token = localStorage.getItem('token');
  }

  signout() {
    // sign out.
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('is_admin');

    // this.theroute.navigate(['/login', this.agent.id], { relativeTo: this.route });
    this.router.navigate(['/login'], { relativeTo: this.route });

    // refresh the page
    window.location.reload();
  }

  openNewTicketWindow() {
    const dialogRef = this.matDialog.open(NewTicketComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
