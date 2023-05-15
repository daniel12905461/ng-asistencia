import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertSwallService {

  constructor() { }
  
  showSwallError(message: string) {
    Swal.fire({
      position: 'top-end',
      width: '30vh',
      heightAuto: true,
      icon: 'error',
      text: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  showSwallSuccess(message: string, html?: string) {
    Swal.fire({
      position: 'top-end',
      width: '30vh',
      heightAuto: true,
      icon: 'success',
      text: message,
      html: html,
      showConfirmButton: false,
      timer: 2000
    });
  }

  async showConfirm(options: { title: string; text: string; icon?: 'warning' }) {
    return await Swal.fire({
      title: options.title,
      html: options.text,
      icon: options.icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, acepto'
    });
  }
}
