import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { selectAllStarships, selectFilterdStarships, selectLoading, selectManufacturers } from '../../store/selectors/starship.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { clearSelectedStarship, filterStarships, loadStarships, updateSearchText, updateSelectedManufacturer } from '../../store/actions/starship.actions';
import { AsyncPipe } from '@angular/common';
import { Subscription, take } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
export class StarshipsListComponent implements OnDestroy, AfterViewInit {
  manufacturers$ = this.store.select(selectManufacturers);
  starships$ = this.store.select(selectFilterdStarships);
  loading$ = this.store.select(selectLoading);

  searchText = '';
  selectedManufacturer = '';

  displayedColumns: string[] = ['name', 'manufacturer', 'starship_class', 'details'];
  dataSource = new MatTableDataSource<any>([]);


  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>, private router: Router) { }
  public ngAfterViewInit(): void {
    this.loadAllData();
    this.syncTableDataSource();

  }
  
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  private syncTableDataSource() {
    this.subscription.add(
      this.starships$.subscribe((starships) => {
        if (starships) {
          this.dataSource.data = starships;
        }
      })
    );
  }

  protected onSearchChange() {
    this.store.dispatch(updateSearchText({ searchText: this.searchText }));
    this.store.dispatch(filterStarships());
  }

  protected onManufacturerChange() {
    this.store.dispatch(
      updateSelectedManufacturer({ manufacturer: this.selectedManufacturer })
    );
    this.store.dispatch(filterStarships());
  }

  protected loadAllData() {
    this.store.dispatch(loadStarships());
  }

  protected viewDetails(url: string) {
    this.store.dispatch(clearSelectedStarship());
    const id = url.split('/').filter(Boolean).pop();
    if (id) this.router.navigate(['/starship-detail', id]);
  }

}
