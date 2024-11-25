import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  correo: string = '';
  codigo: string = '';
  codigoEnviado: boolean = false;
  contrasenaRecuperada: boolean = false;
  contrasena: string = '';

  constructor(private navCtrl: NavController) {} 

  enviarCodigo() {
    if (this.correo) {
      this.codigoEnviado = true;
      console.log('Código enviado a: ' + this.correo);
    } else {
      console.error('Debes ingresar un correo electrónico válido');
    }
  }

  mostrarContrasena() {
    if (this.codigo) {
      this.contrasena = '123456'; 
      this.contrasenaRecuperada = true;
      console.log('Contraseña recuperada: ' + this.contrasena);
    } else {
      console.error('Debes ingresar el código de verificación');
    }
  }


  volverAlLogin() {
    this.navCtrl.navigateBack('/login');  // Navega de vuelta a la página de login
  }
}



