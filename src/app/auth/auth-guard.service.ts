import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './ngrx/auth.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>) {}

  public canActivate(): Observable<boolean> {
    return this.store.select('auth')
      .take(1)
      .map((authState: fromAuth.State) => {
      return authState.authenticated;
    });
  }
}
