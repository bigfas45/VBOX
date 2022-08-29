import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieReviewDialogComponent } from '../movie-review-dialog/movie-review-dialog.component';

@Component({
  selector: 'app-producer-details-editdialog',
  templateUrl: './producer-details-editdialog.component.html',
  styleUrls: ['./producer-details-editdialog.component.scss'],
})
export class ProducerDetailsEditdialogComponent implements OnInit {
  selectedAction: string;

  producerDetailsForm: FormGroup;

  bankDetailsForm: FormGroup;

  page: string = 'form';

  selectedState: string = '';

  states: string[] = [
    'Lagos',
    'Ibadan',
    'Abuja',
    'Delta',
    'Imo',
  ];

  constructor(
    public dialogRef: MatDialogRef<ProducerDetailsEditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.selectedAction = this.data.action;
    this.producerDetailsForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
    });
    this.bankDetailsForm = new FormGroup ({
      bank: new FormControl(null, [Validators.required]),
      account: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
    })
  }

  changeDetails(activity:string, form) {

    if (form.invalid) {
      return
    }

    this.dialogRef.close();

    const reviewDialog = this.dialog.open(MovieReviewDialogComponent, {
      data: {reviewType : 'approve' ,reviewMessage:`${activity} details successfully changed `},
      disableClose: true
    })
  }
}
