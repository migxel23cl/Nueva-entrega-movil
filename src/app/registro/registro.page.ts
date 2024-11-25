import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIControllerService } from '../servicios/apicontroller.service'; // Ajusta la ruta según sea necesario

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  errorMessage: string = '';

  constructor(private apiService: APIControllerService, private router: Router) {}

  async registrarse() {
    // Validar que las contraseñas coinciden
    if (this.contrasena !== this.confirmarContrasena) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    // Crear un objeto para el nuevo usuario
    const nuevoUsuario = {
      correo: this.correo,
      contrasena: this.contrasena
    };

    try {
      // Llamar al método de la API para agregar el nuevo usuario
      await this.apiService.postUsuarios(nuevoUsuario).toPromise();
      
      // Redirigir a la página de login después de registrar
      this.router.navigate(['/login']);
      console.log("Usuario agregado a la base de datos")
    } catch (error) {
      // Manejar errores
      this.errorMessage = 'Error al registrar el usuario. Intenta nuevamente.';
      console.error('Error al registrar usuario: ', error);
    }
  }
}


