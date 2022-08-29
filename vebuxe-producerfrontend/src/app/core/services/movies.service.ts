import { Injectable } from '@angular/core';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor() { }

  movies = [
    {
      id: 0,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Pending Review',
      release: 'old'
    },
    {
      id: 1,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Accepted',
      release: 'new'
    },
    {
      id: 2,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Pending Review',
      release: 'new'
    },
    {
      id: 3,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Pending Review',
      release: 'old'
    },
    {
      id: 4,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Rejected',
      release: 'old'
    },
    {
      id: 5,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Pending Review',
      release: 'new'
    },
    {
      id: 6,
      title: 'Apocalypse',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Pending Review',
      release: 'old'
    },
    {
      id: 7,
      title: 'Psyche',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Pending Review',
      release: 'old'
    },
    {
      id: 8,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Pending Review',
      release: 'new'
    },
    {
      id: 9,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Pending Review',
      release: 'old'
    },
    {
      id: 10,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Approved',
      release: 'old'
    },
    {
      id: 11,
      title: 'Deep in love - ocean view',
      postedBy: 'Steven Olawale Johnson',
      genre: 'Action, Romance',
      datePosted: '25/10/2021',
      status: 'Removed',
      release: 'old'
    },
  ];

  public getMovies() {
    return this.movies.slice()
  }

  public getMovie(index: number) {
    return this.movies[index];
  }
}
