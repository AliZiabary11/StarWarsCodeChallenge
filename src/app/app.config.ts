import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { metaReducers } from './store/meta-reducers/meta-reducers';
import { StarshipEffects } from './store/effects/starship.effects';
import { starshipReducer } from './store/reducers/starship.reducer';

export const appConfig: ApplicationConfig = {
  providers: [    provideRouter(routes),
    provideStore({ starship: starshipReducer }, { metaReducers }),
    provideEffects([StarshipEffects]),]
};
