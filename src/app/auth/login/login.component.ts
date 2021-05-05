import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: string;
  pass: string;
  permiso: boolean;

  constructor(public router: Router) {}

  ngOnInit(): void {}

  iniciarSesion() {
    if (this.user === 'usuario' && this.pass === 'usuario1') {
      this.router.navigate(['/dashboard']);
      this.permiso = true;
      const objSesion = {
        usuario: this.user,
        permiso: 'ningun permiso',
      };

      localStorage.setItem('objSesion', JSON.stringify(objSesion));
    } else if (this.user === 'admin' && this.pass === 'admin1') {
      this.router.navigate(['/dashboard']);
      const objSesion = {
        usuario: this.user,
        permiso: 'todos permisos',
      };

      localStorage.setItem('objSesion', JSON.stringify(objSesion));
    } else {
      Swal.fire(
        'Respuesta errada',
        'Uusuario o contraseña incorrectos',
        'error'
      );
    }
  }
}
