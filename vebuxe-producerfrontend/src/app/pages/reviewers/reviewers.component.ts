import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MoviesService } from 'src/app/core/services/movies.service';
import { ReviewersService } from 'src/app/core/services/reviewers.service';

@Component({
  selector: 'app-reviewers',
  templateUrl: './reviewers.component.html',
  styleUrls: ['./reviewers.component.scss']
})
export class ReviewersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  tableData: any;

  allChecked: boolean = false;

  numberOfSelected: number = 0;

  displayedColumns: string[] = [
    'checkbox',
    'fullname',
    'address',
    'phone',
    'email',
    'role',
  ];
  dataSource: any;

  filteredString;

  reviwersSummary = [
    { item: 'Total Reviwers', value: 500 },
    { item: 'My Assigned Reviewer', value: 55 },
    { item: 'Removed Reviewers', value: 8 },
  ];

  constructor(private reviewersService: ReviewersService) { }

  ngOnInit(): void {
    this.tableData = this.reviewersService.getReviewers();
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

  updateSelectedStatus() {

    let selectedNumber: number = 0;

    setTimeout(() => {
      this.allChecked =
      this.tableData != null && this.tableData.every((t) => t.selected);
      this.tableData.forEach((item) => {
        if (item.selected === true) {
          selectedNumber += 1;
        }
      });
      this.numberOfSelected = selectedNumber;
    }, 500);
  }

  setAll(completed: boolean) {
    this.allChecked = completed;
    if (this.tableData == null) {
      return;
    }
    if (completed) {
      this.tableData.forEach((t) => (t.selected = true));
      this.updateSelectedStatus();
    } else {
      this.tableData.forEach((t) => (t.selected = false));
      this.updateSelectedStatus();
    }


  }



  filterTable(column) {
    if (column == 'fullname') {
      this.dataSource.filterPredicate = (data, filter: string): boolean => {
        return (
          data.fullname.toLocaleLowerCase().includes(filter)
        )
      }
    }

  }

  applyFilter(event: Event) {
    this.filterTable('fullname')
    this.filteredString= (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filteredString.trim().toLocaleLowerCase();


  }
}
