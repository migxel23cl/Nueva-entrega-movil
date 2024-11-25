import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  /* Estado de carga */
  spinner = false;

  constructor(private router: Router) {}

  cambiarSpinner() {
    this.spinner = !this.spinner;
  }

  iniciarSesion() {
    this.cambiarSpinner();

  
    setTimeout(() => {
      this.router.navigate(['/login']);

      
      this.cambiarSpinner();
    }, 3000); 
  }
}


