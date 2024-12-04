import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, debounceTime, map, mergeMap, of } from 'rxjs';
import {
  loadStarshipDetails,
  loadStarshipDetailsSuccess,
  loadStarshipDetailsFailure,
  searchStarships,
  searchStarshipsSuccess,
  searchStarshipsFailure,
} from '../actions/starship.actions';

@Injectable()
export class StarshipEffects {
  private apiUrl = 'https://swapi.dev/api/starships';

  constructor(private actions$: Actions, private http: HttpClient) {}

  loadStarshipDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStarshipDetails),
      mergeMap(({ id }) =>
        this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
          map((details) => loadStarshipDetailsSuccess({ details })),
          catchError((error) => of(loadStarshipDetailsFailure({ error })))
        )
      )
    )
  );

  searchStarships$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchStarships),
      debounceTime(300), // Add debounce to avoid unnecessary rapid API calls
      mergeMap(({ search }) =>
        this.http.get<any>(`${this.apiUrl}/?search=${search}`).pipe(
          map((response) => searchStarshipsSuccess({ starships: response.results })),
          catchError((error) => of(searchStarshipsFailure({ error })))
        )
      )
    )
  );
  
}
