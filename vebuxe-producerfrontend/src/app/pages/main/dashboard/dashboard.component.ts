import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardContentsSum = [
    { item: 'Total number of movies', value: 5489 },
    { item: 'Total number of producers', value: 1599 },
    { item: 'Approved movies', value: 1399 },
    { item: ' Pending review movies', value: 180 },
    { type: 'Declined movies', value: 20 },
  ];

  constructor() {}

  ngOnInit(): void {}


}
