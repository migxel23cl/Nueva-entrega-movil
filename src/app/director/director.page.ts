import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, LoadingController } from '@ionic/angular';
import { LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component'; // Componente del modal
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';



@Component({
  selector: 'app-director',
  templateUrl: './director.page.html',
  styleUrls: ['./director.page.scss'],
})
export class DirectorPage implements OnInit {
  qrText = '';

  scanResult= '';
   //Almacena el texto del código escaneado
   constructor(
    private modalController: ModalController,
    private platform: Platform,
    private router:Router
  ) {}

  ngOnInit(): void {
    if(this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners()
    }
  }

  async startScan() {
    // Crear el modal para iniciar el escaneo
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent, // Componente del modal,
      cssClass:'barcode-scanning-modal',
      showBackdrop:false,
      componentProps: {
        formats: ['QR_CODE'], // Tipos de código admitidos, ejemplo: ['QR_CODE']
        lensFacing: LensFacing.Back, // Usa la cámara trasera
      },
    });

    // Abre el modal
    await modal.present();

    // Recoge los datos del código escaneado al cerrar el modal
    const { data } = await modal.onWillDismiss();


    if (data){
      this.scanResult=data?.barcode?.displayValue;
    }
  }

  navigateToQrPage() {
    this.router.navigate(['/qrpage']);
  }
}
