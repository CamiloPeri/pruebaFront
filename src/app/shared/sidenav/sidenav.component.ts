import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  objSesion: any;
  constructor(public router: Router) {
    this.objSesion = JSON.parse(localStorage.getItem('objSesion'));
  }

  ngOnInit(): void {}

  cerrarSesion() {
    this.router.navigate(['/Login']);
    localStorage.clear();
  }
}
