import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';

@Component({
  selector: 'app-director',
  templateUrl: './director.page.html',
  styleUrls: ['./director.page.scss'],
})
export class DirectorPage {
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router
  ) {}

  async openScanner(): Promise<void> {
    // Solicitar permisos de cámara
    const hasPermission = await this.requestCameraPermission();
    if (!hasPermission) {
      this.showPermissionAlert();
      return;
    }

    // Abrir el modal del escáner si se otorgaron los permisos
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      componentProps: {
        formats: ['QR_CODE', 'EAN_13'], // Formatos deseados
        lensFacing: 'back', // Lente trasera
      },
      cssClass: 'barcode-scanning-modal',
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data && result.data.barcode) {
        const scannedText = result.data.barcode.rawValue;
        console.log('Código escaneado:', scannedText);
        // Mostrar el texto escaneado en una alerta
        await this.showScannedCodeAlert(scannedText);
      }
    });

    await modal.present();
  }

  // Método para solicitar permisos de cámara
  private async requestCameraPermission(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  // Mostrar alerta si no se otorgaron los permisos
  private async showPermissionAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Se necesita el permiso de cámara para usar el escáner de códigos.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Mostrar alerta con el texto escaneado
  private async showScannedCodeAlert(scannedText: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Código Escaneado',
      message: scannedText || 'No se pudo leer el código.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  navigateToQrPage() {
    this.router.navigate(['/qrpage']);
  }
}




