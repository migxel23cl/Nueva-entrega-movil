import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { APIControllerService } from './apicontroller.service'; 

@Injectable({
  providedIn: 'root',
})
export class AuthenticatorService {
  connnectionStatus: boolean;

  
  constructor(private storage: StorageService, private apiService: APIControllerService) { 
    this.connnectionStatus = false;
  }

  
  async loginBDD(correo: string, contrasena: string): Promise<boolean> {
    try {
      // Obtener usuarios directamente desde la API
      const usuarios = await this.apiService.getUsuarios().toPromise();
      
     
      const usuarioEncontrado = usuarios.find((usuario: any) => usuario.correo === correo && usuario.contrasena === contrasena);
  
      if (usuarioEncontrado) {
        this.connnectionStatus = true;
        return true;
      } else {
        this.connnectionStatus = false;
        return false;
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
      this.connnectionStatus = false;
      return false;
    }
  }

  // Verificar si el usuario está conectado
  async isConectedAsync(): Promise<boolean> {
    console.log('isConectedAsync - Estado de conexión:', this.connnectionStatus);
    return this.connnectionStatus;
  }

  logout() {
    this.connnectionStatus = false;
  }

  //registrar usuario
  async registrar(usuario: any): Promise<boolean> {
    try {
      const res = await this.storage.set(usuario.correo, usuario);
      console.log('Usuario registrado:', usuario);
      return res != null;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false;
    }
  }
}


