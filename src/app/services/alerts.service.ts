import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para emisión de alertas
 */
export class AlertsService {

  constructor() { }

  /**
   * Método para mostrar alertas de error. El método analizada el tipo de error y devuelve el mensaje indicado dentro de la alerta.
   * @param err {Error} El error recibido al realizar la petición
   * @param title {String} Título personalizado
   * @param message {String} Mensaje personalizado
   */
  showError(err:any, title: string, message: string){
    // Si es un error 40X, se emite alerta con los mensajes personalizados
    if (err.status===404 || err.status===400 || err.status===409){
      Swal.fire({
        icon: 'error',
        title: title,
        text: message,
        width: 300,
      }) // Si es el error por defecto de Spring, se informa de error del servidor
    } else if (err.status===0){
      Swal.fire({
        icon: "info",
        title: "Error de conexión con el servidor",
        text: 'Intente de nuevo en unos momentos',
        width: 300,
      }) // Si es otro error, se muestra código de error y se pide esperar unos momentos
    } else { 
      Swal.fire({
        icon: "info",
        title: `error ${err.status}`,
        text: 'Intente de nuevo en unos momentos',
        width: 300,
      })
    }
  }

  /**
   * Método para emitir alertas de éxito
   * @param title {String} Título personalizada de la alerta
   * @param message {String} Mensaje personalizado del cuerpo de la alerta
   */
  showExito(title: string, message: string){
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      width: 300,
    })
  }

  /**
   * Método para emitir alertas de confirmación
   * @param title {String} Título personalizada de la alerta
   * @param text {String} Cuerpo personalizado de la aerta
   * @returns Una promesa que será resulta en el método donde se llame
   */
  showConfirm(title, text){
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelarla',
      cancelButtonText: "Mantener la cita"
    })
  }
}
