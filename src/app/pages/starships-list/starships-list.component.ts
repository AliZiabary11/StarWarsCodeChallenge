import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { selectAllStarships, selectLoading, selectSelectedStarship } from '../../store/selectors/starship.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { loadStarshipDetails, loadStarships } from '../../store/actions/starship.actions';
import { AsyncPipe } from '@angular/common';
import { Subscription, take } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

const Modules: any[] = [MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  FormsModule];
@Component({
  selector: 'app-starships-list',
  standalone: true,
  imports: [AsyncPipe, ...Modules],
  templateUrl: './starships-list.component.html',
  styleUrl: './starships-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarshipsListComponent implements OnInit, OnDestroy {
  starships$ = this.store.select(selectAllStarships);
  selectedStarship$ = this.store.select(selectSelectedStarship);
  loading$ = this.store.select(selectLoading);

  displayedColumns: string[] = ['name', 'manufacturer','starship_class','details'];
  filteredStarships: any[] = [];
  manufacturers: string[] = [];
  searchText = '';
  selectedManufacturer = '';
  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) { }




  ngOnInit() {
    this.store.dispatch(loadStarships());
    this.fillManufacturersData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private fillManufacturersData() {
    this.subscription.add(this.starships$.subscribe((starships) => {
      if (starships) {
        this.filteredStarships = starships;
        this.manufacturers = Array.from(
          new Set(starships.map((s) => s.manufacturer).filter((m) => !!m))
        );
      }
    }));
  }

  filterStarships() {
    this.starships$.subscribe((starships) => {
      this.filteredStarships = starships.filter((starship) => {
        const matchesSearch = starship.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
        const matchesManufacturer =
          !this.selectedManufacturer || starship.manufacturer === this.selectedManufacturer;
        return matchesSearch && matchesManufacturer;
      });
    });
  }




  viewDetails(url: string) {
    const id = url.split('/').filter(Boolean).pop();
    if (id) this.store.dispatch(loadStarshipDetails({ id }));
  }
}
