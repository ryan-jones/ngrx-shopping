import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/ngrx/auth.reducers';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public authState: Observable<fromAuth.State>;
  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }
  public onSaveData(): void {
    this.dataStorageService.storeRecipes().subscribe((response: Response) => console.log(response));
  }

  public onFetchData(): void {
    this.dataStorageService.getRecipes();
  }

  public onLogout(): void {
    this.authService.logout();
  }
}
