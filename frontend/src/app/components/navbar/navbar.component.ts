import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  public loggedIn: boolean = false;
  constructor(private auth:AuthService) { } 
  ngOnInit(): void {
   this.auth.authStatus.subscribe(value => this.loggedIn = value);
  }

}
