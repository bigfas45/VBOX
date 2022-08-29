import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewersService {

  constructor() { }

  reviewers= [
    {
      id: 0,
      fullname: 'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island, Lagos.',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com',
      role: 'Reviewer',
    },
    {
      id: 1,
      fullname: 'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island, Lagos.',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com',
      role: 'Reviewer',
    },
    {
      id: 2,
      fullname: 'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island, Lagos.',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com',
      role: 'Reviewer',
    },
    {
      id: 3,
      fullname: 'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island, Lagos.',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com',
      role: 'Reviewer',
    },
    {
      id: 4,
      fullname: 'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island, Lagos.',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com',
      role: 'Reviewer',
    },
    {
      id: 5,
      fullname: 'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island, Lagos.',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com',
      role: 'Reviewer',
    },
    {
      id: 6,
      fullname: 'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island, Lagos.',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com',
      role: 'Reviewer',
    },
    {
      id: 7,
      fullname: 'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island, Lagos.',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com',
      role: 'Reviewer',
    },
    {
      id: 8 ,
      fullname: 'Akinkunmi Steven Olawale',
      address: '8, Idowu taylor street, victoria island, Lagos.',
      phone: '08057389033',
      email: 'akinkunmi.akindele@gmail.com',
      role: 'Reviewer',
    },
  ];

  public getReviewers() {
    return this.reviewers.slice()
  }

}
