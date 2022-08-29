import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  tableData = [
    {
      id: 1,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Pending Review',
    },
    {
      id: 2,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Pending Review',
    },
    {
      id: 3,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Pending Review',
    },
    {
      id: 4,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Pending Review',
    },
    {
      id: 5,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Pending Review',
    },
    {
      id: 6,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Pending Review',
    },
    {
      id: 7,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Pending Review',
    },
    {
      id: 8,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Pending Review',
    },
    {
      id: 9,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Pending Review',
    },
    {
      id: 10,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Pending Review',
    },
  ];

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
  dataSource = new MatTableDataSource(this.tableData);

  constructor() {}

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
