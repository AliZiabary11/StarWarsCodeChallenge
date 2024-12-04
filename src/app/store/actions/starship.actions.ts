import { createAction, props } from '@ngrx/store';


export const loadStarships = createAction('[Starships] Load Starships');
export const loadStarshipsSuccess = createAction(
  '[Starships] Load Starships Success',
  props<{ starships: any[] }>()
);
export const loadStarshipsFailure = createAction(
  '[Starships] Load Starships Failure',
  props<{ error: string }>()
);
export const updateSearchText = createAction(
  '[Starships] Update Search Text',
  props<{ searchText: string }>()
);
export const updateSelectedManufacturer = createAction(
  '[Starships] Update Selected Manufacturer',
  props<{ manufacturer: string }>()
);
export const filterStarships = createAction('[Starships] Filter Starships');
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

export const updateManufacturers = createAction(
  '[Starship] Update Manufacturers',
  props<{ manufacturers: any }>()
);


export const clearSelectedStarship = createAction(
    '[Starship] Clear Selected Starship',
  );
