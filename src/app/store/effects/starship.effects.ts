import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, debounceTime, map, mergeMap, of } from 'rxjs';
import {
  loadStarshipDetails,
  loadStarshipDetailsSuccess,
  loadStarshipDetailsFailure,
  loadPaginatedStarshipsSuccess,
  loadPaginatedStarshipsFailure,
  loadPaginatedStarships,
} from '../actions/starship.actions';

@Injectable()
export class StarshipEffects {
  private apiUrl = 'https://swapi.dev/api/starships';

  constructor(private actions$: Actions, private http: HttpClient) {}

  loadPaginatedStarships$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPaginatedStarships),
      mergeMap(({ page, search }) => {
        // Build the query parameters
        let url = `${this.apiUrl}/?page=${page}`;
        if (search) {
          url += `&search=${search}`;
        }
    
        return this.http.get<any>(url).pipe(
          map((response) =>
            loadPaginatedStarshipsSuccess({
              starships: response.results,
              total: response.count,
            })
          ),
          catchError((error) => of(loadPaginatedStarshipsFailure({ error })))
        );
      })
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
