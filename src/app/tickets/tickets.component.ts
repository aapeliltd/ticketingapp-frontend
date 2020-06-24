import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from './../services/localstorage.service';
import { TicketService } from './../services/ticket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentService } from './../services/comment.service';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  isAdmin = false;
  leaveComment: '';
  defaultMessage = 0;
  check = '';

  user = {
    id: null,
    name: null,
    username: null,
    email: null,
  };

  tickets: any = [];

  constructor(
    private storage: LocalstorageService,
    private ticketService: TicketService,
    private snackBar: MatSnackBar,
    private commentService: CommentService
  ) {
    storage.checkIfLoggedIn();

    this.check = localStorage.getItem('is_admin');
    if (this.check == null || this.check === '' || this.check === 'null') {
      this.CustomerTickets();
    } else {
      this.allTicketsForAdminOnly();
    }
  }

  refresh() {
    window.location.reload();
  }

  CustomerTickets() {
    this.ticketService.getCustomerTickets().subscribe(
      (data) => this.handleTicketData(data),
      (error) => this.handleError(error)
    );
  }

  allTicketsForAdminOnly() {
    this.ticketService.getAllTickets().subscribe(
      (data) => this.handleTicketData(data),
      (error) => this.handleError(error)
    );
   //
  }

  ngOnInit(): void {}

  handleTicketData(data) {
   // console.log(data);
    if (data.data.tickets.length === 0) {
      this.defaultMessage = 1;
    } else {
      this.defaultMessage = 0;
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
          comment.createdBy = com.created_by;
          comment.status = com.status;
          ticket.comments.push(comment);
        }
        this.tickets.push(ticket);
      }
    }

    // get user details
    if (this.check == null || this.check === '' || this.check === 'null') {
      this.user.id = data.data.user.id;
      this.user.name = data.data.user.name;
      this.user.email = data.data.user.email;
      this.user.username = data.data.user.username;
    }


    // window.location.reload();
    // console.log(this.tickets);
  }

  handleError(error) {
    // alert('something went wrong, please try again');
  }

  addComment(ticketId) {
    if (this.leaveComment == null || this.leaveComment === '') {
      alert('Comment cannot be empty');
    } else {
      const snabackRef = this.snackBar.open(
        'Comment was added successfully',
        'Undo',
        { duration: 2000 }
      );

      snabackRef.afterDismissed().subscribe(() => {
        // conso(le.log('the snackbar was dismissed.');
        // save comment
        const comment = {
          body: this.leaveComment,
          ticket_id: ticketId,
          user_id: localStorage.getItem('id'),
        };
        this.commentService.addComment(comment, ticketId).subscribe(
          (data) => this.handleCommentData(data),
          (error) => this.handleCommentError(error)
        );
      });

      snabackRef.onAction().subscribe(() => {
        alert('Action was reversed.');
        this.leaveComment = '';
      });
    }
  }

  handleCommentData(data) {
    const comment = {
      id: null,
      body: null,
      createdAt: null,
      createdBy: null,
      status: null,
    };
    comment.id = data.data.comment.id;
    comment.body = data.data.comment.body;
    comment.status = data.data.comment.status;
    comment.createdAt = data.data.comment.created_at;
    comment.createdBy = data.data.comment.created_by;

    this.leaveComment = '';

    for (const ticket of this.tickets) {
      if (ticket.id === data.data.comment.ticket_id) {
        // found this comment ticket
        ticket.comments.push(comment);
      }
    }
    this.tickets.comments.push(comment);
  }
  handleCommentError(error) {
    alert(error.error.info.message);
    this.leaveComment = '';
  }

  exportPDF() {
    alert('TODO: export tickets to pdf/cvs... it can only done by admin...');
  }

  closeTicket(ticketId) {
    const data1 = {
      id: ticketId,
    };
    this.ticketService.clostTicket(data1).subscribe(
      (data) => this.handleClostTicketData(data),
      (error) => this.handleCloseTicketError(error)
    );
  }

  handleClostTicketData(data) {
    const titcketId = data.data.ticket.id;
    for (const ticket of this.tickets) {
      if (ticket.id === titcketId) {
        ticket.isClose = true;
      }
    }
  }

  handleCloseTicketError(error) {
    console.log(error);
  }
}
