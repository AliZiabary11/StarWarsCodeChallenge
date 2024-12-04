import { Routes } from '@angular/router';
import { StarshipsListComponent } from './pages/starships-list/starships-list.component';
import { StarshipsDetailComponent } from './pages/starships-detail/starships-detail.component';

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
    {
        path: 'starship-detail/:id',
        component: StarshipsDetailComponent
    }
];
