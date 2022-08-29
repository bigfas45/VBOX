import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor() { }

  private transactions = [
    {
      id: '264779390GD',
      movie: 'Deep in love - ocean view',
      amount: 'N100',
      date: '24/10/2021',
      status: 'Paid',
    },
    {
      id: '264779390GD',
      movie: 'Deep in love - ocean view',
      amount: 'N100',
      date: '24/10/2021',
      status: 'Paid',
    },
    {
      id: '264779390GD',
      movie: 'Deep in love - ocean view',
      amount: 'N100',
      date: '24/10/2021',
      status: 'Paid',
    },
    {
      id: '264779390GD',
      movie: 'Deep in love - ocean view',
      amount: 'N100',
      date: '24/10/2021',
      status: 'Paid',
    },
    {
      id: '264779390GD',
      movie: 'Deep in love - ocean view',
      amount: 'N100',
      date: '24/10/2021',
      status: 'Paid',
    },
    {
      id: '264779390GD',
      movie: 'Deep in love - ocean view',
      amount: 'N100',
      date: '24/10/2021',
      status: 'Unpaid',
    },
    {
      id: '264779390GD',
      movie: 'Deep in love - ocean view',
      amount: 'N100',
      date: '24/10/2021',
      status: 'Unpaid',
    },
    {
      id: '264779390GD',
      movie: 'Deep in love - ocean view',
      amount: 'N100',
      date: '24/10/2021',
      status: 'Unpaid',
    },
    {
      id: '264779390GD',
      movie: 'Deep in love - ocean view',
      amount: 'N100',
      date: '24/10/2021',
      status: 'Paid',
    },
  ];

  private withdrwanTransactions = [
    {
      amount: 'N2,539,583',
      bank: 'Wema Bank',
      account: '3748920940',
      date: '24/10/2021',
      status: 'sent',
    },
    {
      amount: 'N2,539,583',
      bank: 'Wema Bank',
      account: '3748920940',
      date: '24/10/2021',
      status: 'sent',
    },
    {
      amount: 'N2,539,583',
      bank: 'Wema Bank',
      account: '3748920940',
      date: '24/10/2021',
      status: 'sent',
    },
    {
      amount: 'N2,539,583',
      bank: 'Wema Bank',
      account: '3748920940',
      date: '24/10/2021',
      status: 'sent',
    },
    {
      amount: 'N2,539,583',
      bank: 'Wema Bank',
      account: '3748920940',
      date: '24/10/2021',
      status: 'sent',
    },
    {
      amount: 'N2,539,583',
      bank: 'Wema Bank',
      account: '3748920940',
      date: '24/10/2021',
      status: 'sent',
    },
    {
      amount: 'N2,539,583',
      bank: 'Wema Bank',
      account: '3748920940',
      date: '24/10/2021',
      status: 'sent',
    },
    {
      amount: 'N2,539,583',
      bank: 'Wema Bank',
      account: '3748920940',
      date: '24/10/2021',
      status: 'sent',
    },
    {
      amount: 'N2,539,583',
      bank: 'Wema Bank',
      account: '3748920940',
      date: '24/10/2021',
      status: 'sent',
    },
    {
      amount: 'N2,539,583',
      bank: 'Wema Bank',
      account: '3748920940',
      date: '24/10/2021',
      status: 'sent',
    },
    {
      amount: 'N2,539,583',
      bank: 'Wema Bank',
      account: '3748920940',
      date: '24/10/2021',
      status: 'sent',
    },
    {
      amount: 'N2,539,583',
      bank: 'Wema Bank',
      account: '3748920940',
      date: '24/10/2021',
      status: 'sent',
    },
    {
      amount: 'N2,539,583',
      bank: 'Wema Bank',
      account: '3748920940',
      date: '24/10/2021',
      status: 'sent',
    },
  ];

  public getReceivedTransactions() {
    return this.transactions.slice()
  }

  public getWithdrawnTransactions() {
    return this.withdrwanTransactions.slice()
  }

}
