import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  public form={
    email:null,
    password:null
  }

  constructor(){}

  ngOnInit(): void {
    
  }

  sumbitLogin() {
    console.log(this.form);
  }

}
