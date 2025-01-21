import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { TokenService } from '../../services/token.service';
import { log } from 'node:console';

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
  public error = null;
  constructor(private backend:BackendService, private token:TokenService){}

  ngOnInit(): void {
    
  }

  sumbitLogin() {
    console.log(this.form);
    return this.backend.login(this.form).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }
  handleError(error: any): void {
    this.error = error.error.error;
  }
  handleResponse(data: any) {
    this.token.handle(data.access_token);
  }

}

