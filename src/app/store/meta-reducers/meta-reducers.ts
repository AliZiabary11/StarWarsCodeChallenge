import { ActionReducer, MetaReducer } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { isDevMode } from '@angular/core';

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    console.log('Action:', action);
    console.log('State before:', state);
    const nextState = reducer(state, action);
    console.log('State after:', nextState);
    return nextState;
  };
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [logger] : [];
