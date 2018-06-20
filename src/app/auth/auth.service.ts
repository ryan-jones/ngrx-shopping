import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from './ngrx/auth.actions';

@Injectable()
export class AuthService {

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  public signupUser(email: string, password: string): void {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(_ => {
        this.store.dispatch(new AuthActions.Signup());
        this.router.navigate(['/']);
        firebase.auth().currentUser.getToken()
          .then((token: string) => this.store.dispatch(new AuthActions.SetToken(token)));
      })
      .catch(error => console.log(error));
  }

  public signinUser(email: string, password: string): void {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(_ => {
        this.store.dispatch(new AuthActions.Signin());
        this.router.navigate(['/']);
        firebase.auth().currentUser.getToken()
          .then((token: string) => this.store.dispatch(new AuthActions.SetToken(token)));
        }
      )
      .catch(error => console.log(error));
  }

  public logout(): void {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.Logout());
  }
}
