import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, debounceTime, map, mergeMap, of } from 'rxjs';
import {
  loadStarshipDetails,
  loadStarshipDetailsSuccess,
  loadStarshipDetailsFailure,
  loadStarships,
  updateManufacturers,
  loadStarshipsSuccess,
  loadStarshipsFailure,
  filterStarships,
} from '../actions/starship.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

@Injectable()
export class StarshipEffects {
  private apiUrl = 'https://swapi.dev/api/starships';

  constructor(private actions$: Actions, private http: HttpClient,private store: Store<AppState>) {}

  loadStarships$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStarships),
      mergeMap(() => this.loadAllStarships(this.apiUrl)),
      map((allStarships: any) => {
        const manufacturers: string[] = [
          ...new Set<string>(allStarships.map((ship: any) => ship.manufacturer)),
        ];
        this.store.dispatch(updateManufacturers({ manufacturers }));
        return loadStarshipsSuccess({ starships: allStarships });
      }),
      catchError((error) => of(loadStarshipsFailure({ error: error.message })))
    )
  );

  private loadAllStarships(url: string, starships: any[] = []): any {
    return this.http.get<any>(url).pipe(
      mergeMap((response: any) => {
        debugger;
        const nextStarships = [...starships, ...response.results];
        if (response.next) {
          return this.loadAllStarships(response.next, nextStarships);
        }
        return of(nextStarships);
      })
    );
  }

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
