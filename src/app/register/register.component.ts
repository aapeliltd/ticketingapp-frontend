import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { LocalstorageService } from './../services/localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  angForm: FormGroup;
  selected = '0';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private storage: LocalstorageService,
    private route: ActivatedRoute,
    private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.required],
      password: ['', Validators.required],
      is_admin: ['', Validators.required],
    });
  }

  signup() {
    if (this.angForm.valid) {
      this.auth.register(this.angForm.value).subscribe(
        (data) => this.handleRegisterData(data),
        (error) => this.handleError(error)
      );
    }
  }

  handleRegisterData(data) {
      // save data to localstorage
    this.storage.save('email', data.user.email);
    this.storage.save('username',  data.user.username);
    this.storage.save('token', data.user.token);
    this.storage.save('id', data.user.id);
    this.storage.save('is_admin', data.user.is_admin);

    this.router.navigate(['/tickets'], { relativeTo: this.route });

    // refresh the page
    // window.location.reload();
  }

  handleError(error) {
    alert('Something went wrong, please try again !');
  }
}
