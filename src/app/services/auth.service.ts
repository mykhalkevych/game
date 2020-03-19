import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = this.auth.authState;
  constructor(private auth: AngularFireAuth) {}

  signIn({ email, password }) {
    return from(this.auth.signInWithEmailAndPassword(email, password));
  }

  logout() {
    return from(this.auth.signOut());
  }
}
