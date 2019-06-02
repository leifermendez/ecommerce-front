import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
  openSnackBar(message: string, action: string, duration: number = 5000) {
    console.log(message, action);
    if (action === 'success') {
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: message,
        showConfirmButton: false,
        timer: duration,
        toast: true,
        background: 'rgba(0, 0, 0, 0.96)',
      });
    } else if (action === 'error') {
      Swal.fire({
        position: 'top-end',
        type: 'error',
        title: message,
        showConfirmButton: false,
        timer: duration,
        toast: true,
        background: 'rgba(0, 0, 0, 0.96)',
      });
    } else {
      Swal.fire({
        position: 'top-end',
        type: 'error',
        title: message,
        showConfirmButton: false,
        timer: duration,
        toast: true,
        background: 'rgba(0, 0, 0, 0.96)',
      });
    }

  }
}
