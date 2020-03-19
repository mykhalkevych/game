import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Login } from 'src/app/store/auth/auth.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  signUpForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  signIn() {
    if (this.signInForm.valid) {
      this.store.dispatch(new Login(this.signInForm.value));
    }
  }

  signUp() {
    if (this.signUpForm.valid) {
      this.store.dispatch(new Login(this.signUpForm.value)).subscribe(() => {
        const data = {
          email: this.signInForm.value['email'],
          password: this.signInForm.value['password']
        };
        this.store.dispatch(new Login(data));
      });
    }
  }
}
