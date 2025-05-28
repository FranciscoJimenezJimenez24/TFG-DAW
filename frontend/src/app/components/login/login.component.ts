import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../services/usuarios.service';
import { NavbarComponent } from '../navbar/navbar.component';

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
  constructor(
    private backend:BackendService, 
    private token:TokenService, 
    private router:Router, 
    private auth:AuthService,
    private usuariosService:UsuariosService,
  ) { }

  ngOnInit(): void {
    
  }

  sumbitLogin() {
    return this.backend.login(this.form).subscribe(
      (data) => {
        this.handleResponse(data)
        this.getUsuarios()
      },
      (error) => this.handleError(error)
    );
  }
  handleError(error: any): void {
    this.error = error.error.error;
  }
  handleResponse(data: any) {    
    this.token.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/');
  }
  getUsuarios() {
   this.usuariosService.getUsuario()
    .subscribe(usuario=>{
      localStorage.setItem("nombre",usuario.name);
      localStorage.setItem("email",usuario.email);
      localStorage.setItem("idUsuario",usuario.id+"");
      localStorage.setItem("rol",usuario.rol);
    });
  }
}

