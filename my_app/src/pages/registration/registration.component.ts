import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private http: HttpClient, private router: Router) {}

  signupForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
    ]),
    checkboxFormControl: new FormControl(false, [
      Validators.requiredTrue,
    ]),
    name: new FormControl(''),
    phoneNumber: new FormControl(''),
    city: new FormControl(''),
    zip: new FormControl(''),
    street: new FormControl(''),
    houseNumber: new FormControl(''),
    floor: new FormControl(''),
    door: new FormControl(''),
  });

  matcher = new MyErrorStateMatcher();

  get confirmPasswordFormControl(): FormControl {
    return this.signupForm.get('confirmPassword') as FormControl;
  }
  
  get passwordFormControl(): FormControl {
    return this.signupForm.get('password') as FormControl;
  }
  
  get emailFormControl(): FormControl {
    return this.signupForm.get('email') as FormControl;
  }

  onSubmit() {
    const formValues = this.signupForm.value;
    console.log('Form values:', formValues);

    this.http.post('http://localhost:3000/user/signup', formValues)
    .subscribe(
      response => {
        console.log('Regisztráció sikeres:', response);
        alert('Sikeres regisztráció!')
        this.router.navigate(['/login'])
      },
      error => {
        console.error('Regisztráció sikertelen:', error);
        alert('Sikertelen regisztráció.:(')
      }
    );

  }
  
}


