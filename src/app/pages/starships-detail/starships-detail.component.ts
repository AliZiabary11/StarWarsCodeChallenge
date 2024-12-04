import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { selectLoading, selectSelectedStarship } from '../../store/selectors/starship.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../store/state/app.state';
import { Store } from '@ngrx/store';
import { loadStarshipDetails } from '../../store/actions/starship.actions';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-starships-detail',
  standalone: true,
  imports: [AsyncPipe, MatCardModule,MatButtonModule,MatProgressSpinnerModule],
  templateUrl: './starships-detail.component.html',
  styleUrl: './starships-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarshipsDetailComponent implements OnInit{
  starship$ = this.store.select(selectSelectedStarship);
  loading$ = this.store.select(selectLoading);

  constructor(private route: ActivatedRoute, private store: Store<AppState>,
    private router: Router,) {}

  public ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(loadStarshipDetails({ id }));
    }
  }

  protected goBack() {
    this.router.navigate(['/']);
  }
}
