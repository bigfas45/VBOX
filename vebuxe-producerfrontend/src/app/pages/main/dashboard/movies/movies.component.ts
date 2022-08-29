import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MoviesService } from 'src/app/core/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class MoviesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  status = [
    '',
    'Pending',
    'Accepted',
    'Rejected'
  ];

  filteredString;
  itemStatus;

  tableData: any;

  displayedColumns: string[] = [
    'id',
    'title',
    'postedBy',
    'genre',
    'datePosted',
    'status',
    'action',
  ];
  displayedColumsObj = [
    { name: 'id', disName: '#' },
    { name: 'title', dispName: 'TITLE' },
    { name: 'postedBy', dispName: 'POSTED BY' },
    { name: 'genre', dispName: 'GENRE' },
    { name: 'datePosted', dispName: 'DATE POSTED' },
    { name: 'status', dispName: 'STATUS' },
    { name: 'action', dispName: 'ACTION' },
  ];
  dataSource: any;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.tableData = this.moviesService.getMovies();
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      console.log(data);
      console.log(filter);
      let matchFound = false;
      for (let column of this.displayedColumns) {
        if (column in data) {
          if (data[column]) {
            matchFound =
              matchFound ||
              data[column]
                .toString()
                .trim()
                .toLowerCase()
                .indexOf(filter.trim().toLowerCase()) !== -1;
          }
        }
      }
      return matchFound;
    };
    this.dataSource.paginator = this.paginator
  }

  filterTable(column) {
    if (column == 'title') {
      this.dataSource.filterPredicate = (data, filter: string): boolean => {
        return (
          data.title.toLocaleLowerCase().includes(filter)
        )
      }
    }

    if (column == 'status') {
      this.dataSource.filterPredicate = (data, filter: string): boolean => {
        return (
          data.status.toLocaleLowerCase().includes(filter)
        )
      }
    }

  }

  applyFilter(event: Event) {
    this.filterTable('title')
    this.filteredString= (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filteredString.trim().toLocaleLowerCase();


  }

  statusCheck(event) {
    this.itemStatus = event;
    this.filterTable('status');
    this.dataSource.filter = this.itemStatus.toLocaleLowerCase();
    // if (this.filteredString) {
    //   this.filterTable('title');
    //   this.dataSource.filter = this.filteredString.trim().toLocaleLowerCase();
    //   console.log('in')
    // }

  }

  onDateSelect (type, event) {
    if (type = 'start') {
      console.log ('start date is ' + event)
    }

    if (type = 'end') {
      console.log('end date is ' + event)
    }

  }
}
