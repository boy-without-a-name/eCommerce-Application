import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error: boolean = false;
  registrationForm: FormGroup;

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
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      console.log('Valid? ', this.registrationForm.valid);
      this.service.register(this.registrationForm.value).then((r) => console.log(r));
    } else {
      this.error = true;
    }
  }

  onConsole(value: any) {
    console.log(value);
  }

  ngOnInit(): void {
  }
}
