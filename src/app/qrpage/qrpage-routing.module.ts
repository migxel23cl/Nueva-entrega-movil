import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QRPage } from './qrpage.page';

const routes: Routes = [
  {
    path: '',
    component: QRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class QrpagePageRoutingModule {}