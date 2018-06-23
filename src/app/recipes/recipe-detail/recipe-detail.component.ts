import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/ngrx/shopping-list.actions';
import * as RecipeActions from '../ngrx/recipe.actions';
import * as fromRecipe from '../ngrx/recipe.reducers';

import { Observable } from 'rxjs/internal/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  public recipeState: Observable<fromRecipe.State>;
  private id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.RecipeState>) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipeState = this.store.select('recipes');
        }
      );
  }

  public onAddToShoppingList(): void {
    this.store.select('recipes')
      .take(1)
      .subscribe((state: fromRecipe.State) => {
        this.store.dispatch(new ShoppingListActions.AddIngredients(state.recipes[this.id].ingredients));
      })
  }

  public onEditRecipe(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  public onDeleteRecipe(): void {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
