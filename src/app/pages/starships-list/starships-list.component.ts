import { ChangeDetectionStrategy, Component } from '@angular/core';
import { selectAllStarships, selectLoading, selectSelectedStarship } from '../../store/selectors/starship.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { loadStarshipDetails, loadStarships } from '../../store/actions/starship.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-starships-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './starships-list.component.html',
  styleUrl: './starships-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarshipsListComponent {
  starships$ = this.store.select(selectAllStarships);
  selectedStarship$ = this.store.select(selectSelectedStarship);
  loading$ = this.store.select(selectLoading);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loadStarships());
  }

  fetchStarshipDetails(url: string) {
    const id = url.split('/').filter(Boolean).pop(); // Extract the ID from the URL
    if (id) this.store.dispatch(loadStarshipDetails({ id }));
  }
}
