import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  loadStarships,
  loadStarshipsSuccess,
  loadStarshipsFailure,
  loadStarshipDetails,
  loadStarshipDetailsSuccess,
  loadStarshipDetailsFailure,
} from '../actions/starship.actions';

@Injectable()
export class StarshipEffects {
  private apiUrl = 'https://swapi.dev/api/starships';

  constructor(private actions$: Actions, private http: HttpClient) {}

  loadStarships$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStarships),
      mergeMap(() =>
        this.http.get<any>(this.apiUrl).pipe(
          map((response) => loadStarshipsSuccess({ starships: response.results })),
          catchError((error) => of(loadStarshipsFailure({ error })))
        )
      )
    )
  );

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
}
