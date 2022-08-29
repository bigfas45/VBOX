import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionsService } from 'src/app/core/services/transactions.service';
import { ProducerDetailsEditdialogComponent } from 'src/app/shared/producer-details-editdialog/producer-details-editdialog.component';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.scss'],
})
export class ProducerComponent implements OnInit, AfterViewInit {

  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) withdrawnPaginator: MatPaginator;


  activeTrans:string = 'received';
  movieuploadStatusview: string = 'approved';
  numberOfStars :number = 5;
  starsArray: string[] = [];

  moviesArray: string[] = [];
  moviesArraySubset:string[];

  receivedTransstatus = [
    '',
    'Paid',
    'Unpaid',
  ];

  withdrawnTransstatus = [
    '',
    'Sent',
  ];

  withdrawnTableData: any;
  receivedTableData: any;

  receivedTransdisplayedColumns: string[] = [
    'id',
    'movie',
    'amount',
    'date',
    'status',
  ];

  withdrawnTransdisplayedColumns: string[] = [
    'amount',
    'bank',
    'account',
    'date',
    'status',
  ];

  filteredString;
  receivedTransStatus;

  receivedTransData: MatTableDataSource<any>;
  withdrawnTransData: MatTableDataSource<any> ;

  producersInfo:{item:string, value:string}[] = [
    {item: 'First name', value: 'Akinkunmi'},
    {item: 'Last name', value: 'Steven'},
    {item: 'Phone number', value: '08057393209'},
    {item: 'Email address', value: 'akinkunmi.akindele@gmail.com'},
    {item: 'Address', value: '8, Idowu taylor street, victoria island, lagos'}
  ];

  bankDetails:{item:string, value:string}[] = [
    {item: 'BVN', value: '23900484920'},
    {item: 'Bank name', value: 'Guaranty Trust Bank'},
    {item: 'Account name', value: 'Akinkunmi steven'},
    {item: 'Account number', value: '0399456378'}
  ];


  constructor(private transactionsService: TransactionsService, private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.receivedTableData = this.transactionsService.getReceivedTransactions();
    this.receivedTransData = new MatTableDataSource(this.receivedTableData);

    this.withdrawnTableData = this.transactionsService.getWithdrawnTransactions();
    this.withdrawnTransData = new MatTableDataSource(this.withdrawnTableData);

    this.receivedTransData.filterPredicate = (data: any, filter: string) => {
      let matchFound = false;
      for (let column of this.receivedTransdisplayedColumns) {
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

    for(let i = 0; i < this.numberOfStars; i++) {
      this.starsArray.push('item');
    }

    for (let i = 0; i < 10; i++) {
      this.moviesArray.push('movie')
    }
    this.moviesArraySubset = this.moviesArray.slice(0,4)

    // this.withdrawnTransData.paginator = this.withdrawnPaginator;
  }

  ngAfterViewInit() {
    this.receivedTransData.paginator = this.paginator ;
    this.withdrawnTransData.paginator = this.paginator;
  }


  filterTable(column) {


    if (column == 'id') {
      this.receivedTransData.filterPredicate = (data, filter: string): boolean => {
        return (
          data.id.toLocaleLowerCase().includes(filter)
        )
      }
    }

    if (column == 'status') {
      this.receivedTransData.filterPredicate = (data, filter: string): boolean => {
        return (
          data.status.toLocaleLowerCase().includes(filter)
        )
      }
    }

  }

  uploadStatusView(selected) {
    this.movieuploadStatusview = selected;

  }

  changeActiveTrans(active:string) {
    this.activeTrans = active;
  }

  applyFilter(event: Event) {
    this.filterTable('id')
    this.filteredString= (event.target as HTMLInputElement).value;
    this.receivedTransData.filter = this.filteredString.trim().toLocaleLowerCase();
  }

  statusCheck(event) {
    this.receivedTransStatus = event;
    this.filterTable('status');
    this.receivedTransData.filter = this.receivedTransStatus.toLocaleLowerCase();

  }

  onDateSelect (type, event) {
    if (type = 'start') {
      console.log ('start date is ' + event)
    }

    if (type = 'end') {
      console.log('end date is ' + event)
    }

  }

  onListPageChange(event: PageEvent) {
    console.log(event)
    const startIndex = event.pageIndex * event.pageSize
    let endIndex = startIndex + event.pageSize
    if(endIndex > this.moviesArray.length) {
      endIndex = this.moviesArray.length;
    }
    this.moviesArraySubset = this.moviesArray.slice(startIndex, endIndex)
  }


  editDetails(action:string) {

      const trailerDialog = this.dialog.open(ProducerDetailsEditdialogComponent, {
        data: {action: action},
        disableClose: true
      });



  }

}
