import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromRecipe from '../ngrx/recipe.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRecipe.RecipeState>) {
  }

  ngOnInit() {
    // 'recipes' calls the RecipeState we set in recipes.modules
    this.recipeState = this.store.select('recipes');
  }

  public onNewRecipe(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
