import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './ngrx/auth.actions';

import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .pipe(
      map((action: AuthActions.TrySignup) => action.payload),
      switchMap((authData: { username: string, password: string }) => {
        return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
      }),
      switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
      }),
      mergeMap((token: string) => {
        return [
          {
            type: AuthActions.SIGNUP
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      })
    );

    @Effect()
    authSignin = this.actions$
      .ofType(AuthActions.TRY_SIGNIN)
      .pipe(
        map((action: AuthActions.TrySignin) => action.payload),
        switchMap((signin: { username: string, password: string }) => {
          return from(firebase.auth().signInWithEmailAndPassword(signin.username, signin.password));
        }),
        switchMap(() => {
          return from(firebase.auth().currentUser.getIdToken());
        }),
        mergeMap((token: string) => {
          this.router.navigate(['/']);
          return [
            {
              type: AuthActions.SIGNIN
            },
            {
              type: AuthActions.SET_TOKEN,
              payload: token
            }
          ];
        })
      );

    @Effect({ dispatch: false})
    authLogout = this.actions$
      .ofType(AuthActions.LOGOUT)
      .pipe(tap(() => this.router.navigate(['/'])));

  constructor(private actions$: Actions, private router: Router) {}

}
