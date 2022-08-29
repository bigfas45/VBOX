import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MovieReviewDialogComponent } from 'src/app/shared/movie-review-dialog/movie-review-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  currentPassVisibility = 'password';
  newPassVisibility = 'password';
  confirmPassVisibility = 'password';
  formSubmitted:boolean = false;

  passwordChangeForm: FormGroup;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.passwordChangeForm = new FormGroup({
      currentPass: new FormControl(null, [Validators.required]),
      newPass: new FormControl(null, [Validators.required]),
      confirmPass: new FormControl(null, [Validators.required]),
    });
  }

  changePassword(event) {
    this.formSubmitted = true;

    if(this.passwordChangeForm.invalid || this.passwordChangeForm.get('newPass').value != this.passwordChangeForm.get('confirmPass').value) {
      console.log(this.passwordChangeForm.get('newPass').value)
      return
    }
    this.passwordChangeForm.reset();
    event.currentTarget.reset();
    this.formSubmitted = false;

    const reviewDialog = this.dialog.open(MovieReviewDialogComponent, {
      data: {reviewType : 'approve' ,reviewMessage:`Password Changed Succesfully `},
      disableClose: true
    })

  }

  onVisibilityChange(visibilityStatus: string) {

    switch (visibilityStatus) {
      case 'currentPass':
        this.currentPassVisibility == 'password'
          ? (this.currentPassVisibility = 'text')
          : (this.currentPassVisibility = 'password');
        break;
      case 'newPass':
        this.newPassVisibility == 'password'
          ? (this.newPassVisibility = 'text')
          : (this.newPassVisibility = 'password');
        break;
      case 'confirmPass':
        this.confirmPassVisibility == 'password'
          ? (this.confirmPassVisibility = 'text')
          : (this.confirmPassVisibility = 'password');
        break;
    }
  }
}
