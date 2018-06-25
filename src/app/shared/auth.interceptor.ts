import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { switchMap, take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/ngrx/auth.reducers';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepted', req);
    return this.store.select('auth')
      .pipe(
        take(1),
        switchMap((authState: fromAuth.State) => {
          const copiedReq = req.clone({ params: req.params.set('auth', authState.token)});
          return next.handle(copiedReq);
        })
      );
      
      
  }
}
