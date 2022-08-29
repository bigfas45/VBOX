import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-trailer-dialog',
  templateUrl: './movie-trailer-dialog.component.html',
  styleUrls: ['./movie-trailer-dialog.component.scss']
})
export class MovieTrailerDialogComponent implements OnInit {

  trailerSource: string

  constructor(public dialogRef: MatDialogRef<MovieTrailerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.trailerSource = this.data.movieSource;
    console.log(this.trailerSource)
  }

  closeDialog() {
    this.dialogRef.close()
  }

}
