import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage {

  constructor(private router: Router) {}

  volverAtras() {
    this.router.navigate(['/director']);
  }
}

