import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StarshipState } from '../reducers/starship.reducer';

export const selectStarshipState = createFeatureSelector<StarshipState>('starship');

export const selectAllStarships = createSelector(
  selectStarshipState,
  (state) => state.starships
);

export const selectFilterdStarships = createSelector(
  selectStarshipState,
  (state) => state.filteredStarships
);

export const selectManufacturers = createSelector(
  selectStarshipState,
  (state) => state.manufacturers
);

export const selectSelectedStarship = createSelector(
  selectStarshipState,
  (state) => state.selectedStarship
);

export const selectLoading = createSelector(
  selectStarshipState,
  (state) => state.loading
);


export const selectError = createSelector(
  selectStarshipState,
  (state) => state.error
);
