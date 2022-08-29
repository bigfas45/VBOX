import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  // OTPForm: FormGroup;
  visibilityStatus = "password";
  loginStep = 0;
  userAuthenticated = false;


  constructor(private router: Router) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup ({
      'userEmail': new FormControl (null, [Validators.required,  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      'userPassword' : new FormControl (null, [Validators.required]),
      'userRemember' : new FormControl(null)
    });
    // this.OTPForm = new FormGroup ({
    //   'otp': new FormControl ()
    // })
  }

  visibilityChange() {
    this.visibilityStatus == "password" ?
    this.visibilityStatus = "text":
    this.visibilityStatus = "password";
  }

  loginFormSubmit(event) {
    console.log(this.loginForm)
    this.loginStep = 1;
  }

  otpSubmit(form: NgForm){
    console.log(form)
    this.userAuthenticated = true;
    this.router.navigate(['/main'])
  }

}
