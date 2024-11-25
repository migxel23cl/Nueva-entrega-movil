import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-director',
  templateUrl: './director.page.html',
  styleUrls: ['./director.page.scss'],
})
export class DirectorPage {
  nombreUsuario: string = '';

  constructor(private router: Router) {  // Inyecta Router en el constructor
    this.nombreUsuario = localStorage.getItem('usuario') || 'Usuario';
  }

  generarCodigo() {
    // Redirige a la página 'qrpage'
    this.router.navigate(['/qrpage']);
  }
}

//crear funcion para que el boton scanee mi codigo con libreria barco de scaner