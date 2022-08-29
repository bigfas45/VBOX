import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MoviesService } from 'src/app/core/services/movies.service';
import { MovieTrailerDialogComponent } from 'src/app/shared/movie-trailer/movie-trailer-dialog.component';
import videojs from 'video.js';
import { MatDialog } from '@angular/material/dialog';
import { MovieReviewDialogComponent } from 'src/app/shared/movie-review-dialog/movie-review-dialog.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('target', { static: true }) target: ElementRef;

  options = {
    // fluid: boolean;
    // aspectRatio: string;
    autoplay: true,
    sources: {
      src: '../../../../../assets/videos/Rick.and.Morty.S01E09..mkv',
      type: 'video/mkv',
    },
  };

  videojs: any;

  videoLink: string = '../../../../../assets/videos/Rick.and.Morty.S01E09..mkv';

  autoplay: true;
  controls: true;
  sources: [{ src: '/path/to/video.mp4'; type: 'video/mp4' }];

  player: videojs.Player;

  isBlockbuster: boolean = false;
  isAudience: boolean = false;
  pgRated: boolean = false;
  pg13: boolean = false;
  restricted: boolean = false;
  adult: boolean = false;
  violent: boolean = false;

  newComment: boolean = true;

  casts: { name: string; image: string }[] = [
    { name: 'Rita Dominic', image: 'rita.png' },
    { name: 'Genevieve Nnaji', image: 'genevive.png' },
    { name: 'Osita Iheme', image: 'osita.png' },
    { name: 'RMD', image: 'rmd.png' },
    { name: 'Funke Akindele', image: 'funke.png' },
    { name: 'Ramsey Noah ', image: 'ramson.png' },
    { name: 'Omotola  ', image: 'omotola.png' },
    { name: 'Kanayo O. K ', image: 'kanayo.png' },
    { name: 'Broda shaggi ', image: '' },
    { name: 'Kolawole ', image: '' },
  ];

  genre: { name: string; selected: boolean }[] = [
    { name: 'Romance', selected: false },
    { name: 'Action', selected: false },
    { name: 'History', selected: false },
    { name: 'Autobiography', selected: false },
    { name: 'Science fiction', selected: false },
    { name: 'Thriller', selected: false },
    { name: 'Drama', selected: false },
    { name: 'Western', selected: false },
    { name: 'Romantic comedy', selected: false },
    { name: 'Documentary', selected: false },
    { name: 'Horror', selected: false },
    { name: 'Animation', selected: false },
    { name: 'Comedy', selected: false },
    { name: 'Adventure', selected: false },
    { name: 'Fantasy', selected: false },
    { name: 'Superhero', selected: false },
  ];

  languages: { name: string; selected: boolean }[] = [
    { name: 'English', selected: false },
    { name: 'Yoruba', selected: false },
    { name: 'Igbo', selected: false },
    { name: 'Pidgin', selected: false },
    { name: 'Huasa', selected: false },
  ];

  subtitles: { name: string; selected: boolean }[] = [
    { name: 'English', selected: false },
    { name: 'Yoruba', selected: false },
    { name: 'Igbo', selected: false },
    { name: 'Pidgin', selected: false },
    { name: 'Huasa', selected: false },
  ];

  movie: any;
  movieIndex: number;

  constructor(private elementRef: ElementRef, private route: ActivatedRoute, private moviesService: MoviesService, private dialog: MatDialog ) {}

  ngOnInit(): void {
    this.movieIndex = this.route.snapshot.params['moveId'];
    this.movie = this.moviesService.getMovie(this.movieIndex);
    // this.route.params.subscribe(
    //   params => {
    //     this.movie = params['movieId'];
    //   }
    // )
    console.log(this.movie);

  }

  ngAfterViewInit(): void {
    // this.player = videojs(
    //   document.getElementById('video-player'),
    //   {
    //     sources: {
    //       src: this.videoLink,
    //       type: 'video/mkv',
    //     },
    //   },
    //   function onPlayerReady() {
    //     // Here where the magic happens :D

    //     this.on('loadedmetadata', () => {});
    //     this.on('timeupdate', () => {});
    //     this.on('loadeddata', () => {});
    //   }
    // );
  }

  toggleSelectStatus(type: { name: string; selected: boolean }) {
    type.selected === true ? (type.selected = false) : (type.selected = true);
  }

  openTrailer() {
    const trailerDialog = this.dialog.open(MovieTrailerDialogComponent, {
      data: {movieSource: this.videoLink},
      disableClose: true
    })

    trailerDialog.afterClosed().subscribe(response => {

    })
  }

  updateReviewStat(review:string) {
    let message: string;
    let declineMsg: string;
    if (review === 'approve') {
      message = 'This movie has been sent for approval'
    } else if (review === 'decline'){
      message = 'Movie declined successfully. The movie producer has been notified.'
    } else if (review === 'reason') {
      declineMsg = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }

    const reviewDialog = this.dialog.open(MovieReviewDialogComponent, {
      data: {reviewType : review ,reviewMessage:message, declineReason:declineMsg },
      disableClose: true
    })
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
