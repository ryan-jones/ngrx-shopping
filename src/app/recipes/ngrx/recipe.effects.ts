import { Effect, Actions } from "@ngrx/effects";
import * as RecipeActions from '../ngrx/recipe.actions';
import * as fromRecipe from '../ngrx/recipe.reducers';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { HttpClient, HttpRequest } from "@angular/common/http";
import { Recipe } from "../recipe.model";
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";



@Injectable()
export class RecipeEffects {
    private url = 'https://recipe-book-eead6.firebaseio.com/recipes.json';

    @Effect()
    recipeFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .pipe(switchMap((action: RecipeActions.FetchRecipes) => {
            return this.httpClient.get<Recipe[]>(`${this.url}`, 
                {
                    observe: 'body',
                    responseType: 'json'
                }
            )
        }),
        map(recipes => {
            recipes.forEach(recipe => {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
            });
            return {
                type: RecipeActions.SET_RECIPES,
                payload: recipes
            };
        }));

    @Effect({ dispatch: false })
    recipeStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .pipe(withLatestFrom(this.store.select('recipes')),
            switchMap(([action, state]) => {
                const req = new HttpRequest('PUT', `${this.url}`, state.recipes, { reportProgress: true });
                return this.httpClient.request(req);
            }));

    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromRecipe.RecipeState>) {}
    
}