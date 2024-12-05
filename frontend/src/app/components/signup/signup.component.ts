import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,  // Marca el componente como standalone
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public error: any = [];

  public form = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  };

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {}

  submitSignup() {
    console.log(this.form);
    return this.backendService.signup(this.form).subscribe(
      data => console.log(data),
      error => this.handleError(error)
    );
  }

  handleError(error: any) {
    console.log(error);
    this.error = error.error.errors;
  }
}
