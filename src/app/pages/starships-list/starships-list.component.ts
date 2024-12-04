import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { selectAllStarships, selectLoading, selectSelectedStarship, selectTotalCount } from '../../store/selectors/starship.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { clearSelectedStarship, loadPaginatedStarships } from '../../store/actions/starship.actions';
import { AsyncPipe } from '@angular/common';
import { Subscription, take } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
const Modules: any[] = [MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  starships$ = this.store.select(selectAllStarships);
  selectedStarship$ = this.store.select(selectSelectedStarship);
  loading$ = this.store.select(selectLoading);
  totalCount$ = this.store.select(selectTotalCount);

  pageSize = 10;
  displayedColumns: string[] = ['name', 'manufacturer', 'starship_class', 'details'];
  manufacturers: string[] = [];
  searchText = '';
  selectedManufacturer = '';
  dataSource = new MatTableDataSource<any>([]);


  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>, private router: Router) { }
  ngAfterViewInit(): void {
    this.loadPage(1);

    this.subscription.add(
      this.starships$.subscribe((starships) => {
        if (starships) {
          this.dataSource.data = starships;
        }
      })
    );

    this.loadManufacturerData();
  }


  protected onPageChange(event: any) {
    const page = event.pageIndex + 1;
    this.loadPage(page);
  }

  private loadManufacturerData() {
    this.subscription.add(
      this.starships$.pipe(take(1)).subscribe((starships) => {
        if (starships) {
          const newManufacturers = Array.from(
            new Set(starships.map((s) => s.manufacturer).filter((m) => !!m))
          );
          this.manufacturers = Array.from(new Set([...this.manufacturers, ...newManufacturers]));
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected loadPage(page: number) {
    this.store.dispatch(loadPaginatedStarships({ page, search: this.searchText }));
  }

  protected onManufacturerChange() {
    alert('The Starwars API does not Support The Filtering by Manufacturer yet');
  }

  protected onSearchChange() {
    this.paginator.pageIndex = 0;
    this.loadPage(1);
  }

  protected viewDetails(url: string) {
    this.store.dispatch(clearSelectedStarship());
    const id = url.split('/').filter(Boolean).pop();
    if (id) this.router.navigate(['/starship-detail', id]);
  }

}
