import { createAction, props } from '@ngrx/store';



export const loadPaginatedStarships = createAction(
  '[Starship] Load Paginated Starships',
  props<{ page: number; search?: string;}>() // Add searchFields for filtering
);

export const loadPaginatedStarshipsSuccess = createAction(
  '[Starship] Load Paginated Starships Success',
  props<{ starships: any[]; total: number }>() // Starships data and total count
);

export const loadPaginatedStarshipsFailure = createAction(
  '[Starship] Load Paginated Starships Failure',
  props<{ error: any }>() // Error details if API fails
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
