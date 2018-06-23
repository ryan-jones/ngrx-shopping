import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  private url = 'https://recipe-book-eead6.firebaseio.com/recipes.json';

  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {}

  public storeRecipes() {
    const req = new HttpRequest('PUT', `${this.url}`, this.recipeService.getRecipes(), { reportProgress: true });
    return this.httpClient.request(req);
  }

  public getRecipes() {
    
  }
}
