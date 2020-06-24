import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  angForm: FormGroup;
  selected = '0';
  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm() {
    this.angForm = this.fb.group({
       name: ['', Validators.required ],
       email : [
        '',
        Validators.compose([
            Validators.required, Validators.email
        ])
    ],
       username: ['', Validators.required ],
       password: ['', Validators.required ],
       is_admin: ['', Validators.required ]
    });
  }

  signup() {
    if (this.angForm.valid) {

      this.auth.register(this.angForm.value);

      alert('success');

    }

  }



}
