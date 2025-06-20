import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  public loggedIn: boolean = false;
  public isCollapsed: boolean = true;

  constructor(
    private auth: AuthService,
    private router: Router, 
    private token: TokenService
  ) { } 

  ngOnInit(): void {
    this.auth.authStatus.subscribe(value => this.loggedIn = value);
  }
  
  get rol(): string | null {
    return localStorage.getItem("rol");
  }
  
  logout(event: MouseEvent) {
    event.preventDefault();
    localStorage.clear();
    this.token.remove();
    this.auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

  goHome(){
    this.router.navigateByUrl('/');
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  shouldShowToggle() {
    return window.innerWidth <= 992;
  }
}
