import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { selectAllStarships, selectLoading, selectSelectedStarship } from '../../store/selectors/starship.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { loadStarships, clearSelectedStarship} from '../../store/actions/starship.actions';
import { AsyncPipe } from '@angular/common';
import { Subscription, take } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
const Modules: any[] = [MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatProgressSpinnerModule,
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

  constructor(private store: Store<AppState>, private router: Router) { }

  public ngOnInit() {
    this.store.dispatch(loadStarships());
    this.fillManufacturersData();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private fillManufacturersData() {
    this.subscription.add(
      this.starships$.subscribe((starships) => {
        if (this.manufacturers.length === 0 && starships?.length) {
          this.manufacturers = Array.from(
            new Set(starships.map((s) => s.manufacturer).filter((m) => !!m))
          );
        }
        this.filteredStarships = starships || [];
      })
    );
  }

  protected filterStarships() {
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


  protected viewDetails(url: string) {
    this.store.dispatch(clearSelectedStarship());
    const id = url.split('/').filter(Boolean).pop();
    if (id) this.router.navigate(['/starship-detail', id]);
  }

}
