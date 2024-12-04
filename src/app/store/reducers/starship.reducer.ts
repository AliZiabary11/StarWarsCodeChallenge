import { createReducer, on } from '@ngrx/store';
import {
  loadStarshipDetails,
  loadStarshipDetailsSuccess,
  loadStarshipDetailsFailure,
  clearSelectedStarship,
  loadPaginatedStarshipsFailure,
  loadPaginatedStarshipsSuccess,
  loadPaginatedStarships,
} from '../actions/starship.actions';

export interface StarshipState {
  starships: any[];
  total: number;
  selectedStarship: any | null;
  loading: boolean;
  error: any | null;
}

export const initialState: StarshipState = {
  starships: [],
  total: 0,
  selectedStarship: null,
  loading: false,
  error: null,
};

export const starshipReducer = createReducer(
  initialState,
  on(loadPaginatedStarships, (state) => ({ ...state, loading: true })),
  on(loadPaginatedStarshipsSuccess, (state, { starships, total }) => ({
    ...state,
    starships,
    total,
    loading: false,
  })),
  on(loadPaginatedStarshipsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(loadStarshipDetails, (state) => ({ ...state, loading: true, error: null })),
  on(loadStarshipDetailsSuccess, (state, { details }) => ({
    ...state,
    selectedStarship: details,
    loading: false,
  })),
  on(loadStarshipDetailsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(clearSelectedStarship, (state) => ({ ...state, selectedStarship:null })),
);
