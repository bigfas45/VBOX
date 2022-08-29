import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-review-dialog',
  templateUrl: './movie-review-dialog.component.html',
  styleUrls: ['./movie-review-dialog.component.scss']
})
export class MovieReviewDialogComponent implements OnInit {

  successMessage: string;
  success: boolean = false;
  reason: boolean = false;
  declineComment: boolean = false;
  declineReason: string;

  constructor(public dialogRef: MatDialogRef<MovieReviewDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    console.log(this.data)
    if (this.data.reviewType == 'approve') {
      this.success = true;
      this.successMessage = this.data.reviewMessage;
      } else if (this.data.reviewType == 'decline') {
        this.success = false;
        this.successMessage = this.data.reviewMessage;
        this.declineComment = true;
    }

    if (this.data.reviewType == 'reason') {
      this.declineReason = this.data.declineReason;
      this.reason = true;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }


  reasonSubmitted(reasonForm: NgForm) {
    console.log(reasonForm);
    this.declineComment = false;
    this.success = true;
  }

}
