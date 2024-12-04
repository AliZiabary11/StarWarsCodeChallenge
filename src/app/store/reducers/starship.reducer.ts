import { createReducer, on } from '@ngrx/store';
import {
  loadStarshipDetails,
  loadStarshipDetailsSuccess,
  loadStarshipDetailsFailure,
  clearSelectedStarship,
  loadStarships,
  loadStarshipsSuccess,
  loadStarshipsFailure,
  updateManufacturers,
  updateSearchText,
  updateSelectedManufacturer,
  filterStarships,
} from '../actions/starship.actions';

export interface StarshipState {
  starships: any[]; // Full list of starships
  manufacturers: string[]; // Unique manufacturers
  filteredStarships: any[]; // Starships after applying filters
  searchText: string; // Search query
  selectedManufacturer: string; // Selected manufacturer for filtering
  selectedStarship: any; // Selected Starship
  loading: boolean; // Loading state
  error: string | null; // Error state
}

export const initialState: StarshipState = {
  starships: [],
  manufacturers: [],
  filteredStarships: [],
  searchText: '',
  selectedManufacturer: '',
  selectedStarship: null,
  loading: false,
  error: null,
};

export const starshipReducer = createReducer(
  initialState,
  on(loadStarshipDetails, (state) => ({ ...state, loading: true, error: null })),
  on(loadStarshipDetailsSuccess, (state, { details }) => ({
    ...state,
    selectedStarship: details,
    loading: false,
  })),
  on(loadStarshipDetailsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(clearSelectedStarship, (state) => ({ ...state, selectedStarship:null })),
  on(loadStarships, (state) => ({ ...state, loading: true })),
  on(loadStarshipsSuccess, (state, { starships }) => ({
    ...state,
    starships,
    filteredStarships: starships, // Initially set to all starships
    manufacturers: [...new Set(starships.map((s) => s.manufacturer))],
    loading: false,
    error: null,
  })),
  on(loadStarshipsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(updateSearchText, (state, { searchText }) => ({
    ...state,
    searchText,
  })),
  on(updateSelectedManufacturer, (state, { manufacturer }) => ({
    ...state,
    selectedManufacturer: manufacturer,
  })),
  on(filterStarships, (state) => {
    const filteredStarships = state.starships.filter((starship) => {
      const matchesSearch =
        starship.name.toLowerCase().includes(state.searchText.toLowerCase()) ||
        starship.manufacturer.toLowerCase().includes(state.searchText.toLowerCase()) ||
        starship.starship_class.toLowerCase().includes(state.searchText.toLowerCase());

      const matchesManufacturer =
        !state.selectedManufacturer ||
        starship.manufacturer === state.selectedManufacturer;
      return matchesSearch && matchesManufacturer;
    });
  
    return {
      ...state,
      filteredStarships,
    };
  }),
  on(updateManufacturers, (state, { manufacturers }) => ({
    ...state,
    manufacturers,
  }))
);
