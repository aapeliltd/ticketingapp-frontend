import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from './../services/localstorage.service';
import { TicketService } from './../services/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  isAdmin = null;

  user = {
    id: null,
    name: null,
    username: null,
    email: null,
  };

  tickets: any = [];

  constructor(
    private storage: LocalstorageService,
    private ticketService: TicketService
  ) {
    storage.checkIfLoggedIn();

    this.isAdmin = localStorage.getItem('is_admin');
    console.log(this.isAdmin);
    if (this.isAdmin) {
      this.CustomerTickets();
    }
  }

  CustomerTickets() {
    this.ticketService.getCustomerTickets().subscribe(
      (data) => this.handleTicketData(data),
      (error) => this.handleError(error)
    );
  }

  ngOnInit(): void {}

  handleTicketData(data) {
    this.user.id = data.data.user.id;
    this.user.name = data.data.user.name;
    this.user.email = data.data.user.email;
    this.user.username = data.data.user.username;

    // tickets
    for (const card of data.data.tickets) {
      const ticket = {
        id: null,
        title: null,
        body: null,
        isClose: null,
        createdAt: null,
        ticketNo: null,
        comments: [],
      };

      ticket.id = card.id;
      ticket.title = card.title;
      ticket.body = card.body;
      ticket.isClose = card.is_close;
      ticket.createdAt = card.created_at;
      ticket.ticketNo = card.ticket_no;
      for (const com of card.comments) {
        const comment = {
          id: null,
          body: null,
          createdAt: null,
          createdBy: null,
          status: null,
        };
        comment.id = com.id;
        comment.body = com.body;
        comment.createdAt = com.created_at;
        comment.createdBy = com.create_by;
        comment.status = com.status;
        ticket.comments.push(comment);
      }
      this.tickets.push(ticket);
    }

    // console.log(this.tickets);
  }

  handleError(error) {
    alert('something went wrong, please try again');
  }
}
