import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../shared/data-storage.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/ngrx/auth.reducers';
import * as AuthActions from '../auth/ngrx/auth.actions';

import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public authState: Observable<fromAuth.State>;
  constructor(private dataStorageService: DataStorageService, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }
  public onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  public onFetchData(): void {
    this.dataStorageService.getRecipes();
  }

  public onLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }
}
