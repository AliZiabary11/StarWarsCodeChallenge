import { createAction, props } from '@ngrx/store';

export const loadStarships = createAction('[Starship] Load Starships');
export const loadStarshipsSuccess = createAction(
  '[Starship] Load Starships Success',
  props<{ starships: any[] }>()
);
export const loadStarshipsFailure = createAction(
  '[Starship] Load Starships Failure',
  props<{ error: any }>()
);

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
  