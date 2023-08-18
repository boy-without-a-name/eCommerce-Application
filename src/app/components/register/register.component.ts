import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { IRegisterData } from '../../services/types';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error: boolean = false;
  date: any;
  registrationForm: FormGroup;

  // data: IRegisterData = {
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   password: '',
  //   date: '',
  //   address: {
  //     streetName: '',
  //     streetNumber: '',
  //     postalCode: '',
  //     city: '',
  //     country: 'BY'
  //   }
  // };

  constructor(
    public service: RegisterService,
    private fb: FormBuilder
  ) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-я]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-я]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/),
          Validators.pattern(/^[^\s].*[^\s]$/)
        ]
      ],
      date: ['', [Validators.required]],
      address: this.fb.group({
        city: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-я]+$/)]],
        streetName: ['', [Validators.required]],
        streetNumber: ['', [Validators.required]],
        postalCode: ['', [Validators.required]]
      })
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.registrationForm.value);
    console.log('Valid? ', this.registrationForm.valid);
  }

  onConsole(value: any) {
    console.log(value);
  }

  ngOnInit(): void {
  }
}
