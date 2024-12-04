import { createAction, props } from '@ngrx/store';


export const loadStarshipDetails = createAction(
  '[Starship] Load Starship Details',
  props<{ id: string }>()
);
export const loadStarshipDetailsSuccess = createAction(
  '[Starship] Load Starship Details Success',
  props<{ details: any }>()
);
export const loadStarshipDetailsFailure = createAction(
  '[Starship] Load Starship Details Failure',
  props<{ error: any }>()
);

export const clearSelectedStarship = createAction(
    '[Starship] Clear Selected Starship',
  );


export const searchStarships = createAction(
  '[Starship] Search Starships',
  props<{ search: string }>()
);

export const searchStarshipsSuccess = createAction(
  '[Starship] Search Starships Success',
  props<{ starships: any[] }>()
);

export const searchStarshipsFailure = createAction(
  '[Starship] Search Starships Failure',
  props<{ error: any }>()
);
  