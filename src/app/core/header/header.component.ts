import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/ngrx/auth.reducers';
import * as AuthActions from '../../auth/ngrx/auth.actions';
import * as RecipeActions from '../../recipes/ngrx/recipe.actions';

import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public authState: Observable<fromAuth.State>;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }
  public onSaveData(): void {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  public onFetchData(): void {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  public onLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }
}
