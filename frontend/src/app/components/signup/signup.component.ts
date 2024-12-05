import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  public error:any = [];

  public form={
    name:null,
    email:null,
    password:null,
    password_confirmation:null
  }

  constructor(private backendService:BackendService){}

  ngOnInit(): void {
    
  }

  sumbitSignup() {
    console.log(this.form);
    return this.backendService.signup(this.form).subscribe(
      data=>console.log(data),
      error=>this.handleError(error)
    );
  }

  handleError(error:any){
    this.error = error.error.errors
  }
}
