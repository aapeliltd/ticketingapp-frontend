import { Component, OnInit } from '@angular/core';
import { TicketService } from './../services/ticket.service';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss'],
})
export class NewTicketComponent implements OnInit {
  ticket = {
    title: '',
    body: '',
  };
  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {}

  addTicket() {
    if (this.ticket.title == null || this.ticket.title === '') {
      alert('Title cannot be emptied.');
    } else if (this.ticket.body == null || this.ticket.body === '') {
      alert('Body cannot be emptied');
    } else {
      // save ticket
      this.ticketService.addTicket(this.ticket).subscribe(
        (data) => this.handleTicketData(data),
        (error) => this.handleError(error)
      );
    }
  }

  handleTicketData(data) {
    this.ticket.title = '';
    this.ticket.body = '';

    alert('Ticket created successfully');

    // refresh the window
    window.location.reload();
  }

  handleError(error) {
    console.log(error);
  }
}
