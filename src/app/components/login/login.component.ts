import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Login, SingUp } from 'src/app/store/auth/auth.actions';
import { Router } from '@angular/router';
import { Loading } from 'src/app/store/app/app.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  signUpForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
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
      this.store.dispatch(new Loading(true));
      this.store.dispatch(new Login(this.signInForm.value)).subscribe(() => {
        this.store.dispatch(new Loading(false));
        this.router.navigate(['/games']);
      });
    }
  }

  signUp() {
    if (this.signUpForm.valid) {
      this.store.dispatch(new Loading(true));
      this.store.dispatch(new SingUp(this.signUpForm.value)).subscribe(() => {
        const data = {
          email: this.signUpForm.value['email'],
          password: this.signUpForm.value['password']
        };
        this.store.dispatch(new Login(data)).subscribe(() => {
          this.router.navigate(['/games']);
          this.store.dispatch(new Loading(false));
        });
      });
    }
  }
}
