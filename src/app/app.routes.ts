import { Routes } from '@angular/router';
import { StarshipsListComponent } from './pages/starships-list/starships-list.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main'
    },
    {
        path: 'main',
        component: StarshipsListComponent
    },
];
