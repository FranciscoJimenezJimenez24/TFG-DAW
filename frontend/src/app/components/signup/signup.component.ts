import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  public form={
    name:null,
    email:null,
    password:null,
    password_confirmation:null
  }

  constructor(){}

  ngOnInit(): void {
    
  }

  sumbitSignup() {
    console.log(this.form);
  }
}
