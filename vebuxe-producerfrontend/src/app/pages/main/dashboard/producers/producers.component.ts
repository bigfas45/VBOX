import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-producers',
  templateUrl: './producers.component.html',
  styleUrls: ['./producers.component.scss']
})
export class ProducersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  filteredString: any;

  displayedColumns: string[] = [
    'name',
    'address',
    'phone',
    'email',
    'action',
  ];

  tableData = [
    {name: 'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com',
    },
    {name: 'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com',
    },
    {name: 'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com',
    },
    {name: 'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com  ',
    },
    {name: 'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com',
    },
    {name: 'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com',
    },
    {name: 'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com',
    },
    {name: 'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com',
    },
    {name: 'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com',
    },
    { name:  'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com',
    },
  ];

  dataSource = new MatTableDataSource(this.tableData);

  constructor() { }

  ngOnInit(): void {
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

  filterTable() {

      this.dataSource.filterPredicate = (data, filter: string): boolean => {
        return (
          data.name.toLocaleLowerCase().includes(filter)
        )
      }

  }

  applyFilter(event: Event) {
    this.filterTable()
    this.filteredString= (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filteredString.trim().toLocaleLowerCase();
  }

}
