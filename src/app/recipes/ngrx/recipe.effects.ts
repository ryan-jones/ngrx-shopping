import { Effect, Actions } from "@ngrx/effects";
import * as RecipeActions from '../ngrx/recipe.actions';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipe.model";



export class RecipeEffects {
    private url = 'https://recipe-book-eead6.firebaseio.com/recipes.json';

    @Effect()
    recipeFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .switchMap((action: RecipeActions.FetchRecipes) => {
            return this.httpClient.get<Recipe[]>(`${this.url}`, 
                {
                    observe: 'body',
                    responseType: 'json'
                }
            )
        })
        .map(recipes => {
            recipes.forEach(recipe => {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
            });
            return {
                type: RecipeActions.SET_RECIPES,
                payload: recipes
            };
        })

    constructor(private actions$: Actions, private httpClient: HttpClient) {}
    
}