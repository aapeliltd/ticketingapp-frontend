import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { LocalstorageService } from './../services/localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private storage: LocalstorageService,
    private route: ActivatedRoute,
    private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {

    if (this.angForm.valid) {
      this.auth.login(this.angForm.value).subscribe(
        (data) => this.handleLoginData(data),
        (error) => this.handleError(error)
      );
    }

  }

  handleLoginData(data) {
    this.storage.save('email', data.user.email);
    this.storage.save('username',  data.user.username);
    this.storage.save('token', data.user.token);
    this.storage.save('id', data.user.id);
    this.storage.save('is_admin', data.user.is_admin);

    // window.location.reload();

    this.router.navigate(['/tickets'], { relativeTo: this.route });




  }

  handleError(error) {
    console.log(error);
    alert('Something went wrong, please try again !');
  }




}
