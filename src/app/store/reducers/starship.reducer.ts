import { createReducer, on } from '@ngrx/store';
import {
  loadStarshipDetails,
  loadStarshipDetailsSuccess,
  loadStarshipDetailsFailure,
  clearSelectedStarship,
  searchStarshipsSuccess,
  searchStarshipsFailure,
  searchStarships,
} from '../actions/starship.actions';

export interface StarshipState {
  starships: any[];
  selectedStarship: any | null;
  loading: boolean;
  error: any | null;
}

export const initialState: StarshipState = {
  starships: [],
  selectedStarship: null,
  loading: false,
  error: null,
};

export const starshipReducer = createReducer(
  initialState,
  on(searchStarships, (state) => ({ ...state, loading: true, error: null })),
  on(searchStarshipsSuccess, (state, { starships }) => ({
    ...state,
    starships,
    loading: false,
  })),
  on(searchStarshipsFailure, (state, { error }) => ({
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
