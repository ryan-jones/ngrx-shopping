import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as fromApp from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import * as AuthActions from '../ngrx/auth.actions';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private store: Store<fromApp.AppState>) { }

  public onSignup(form: NgForm): void {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TrySignup({ username: email, password }));
  }
}
