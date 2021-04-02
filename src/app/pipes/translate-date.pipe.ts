import { Pipe, PipeTransform } from '@angular/core';

const meses =['Enero', 'Febrero', 'Marzo', 'Abril', 
'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 
'Octubre', 'Noviembre', 'Diciembre']

const dias =['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

@Pipe({
  name: 'translateDate'
})
/**
 * Pipe para traducir fechas
 */
export class TranslateDatePipe implements PipeTransform {

  /**
   * 
   * @param date Fecha a traducir
   * @returns cadena de texto de la fecha traducida
   */
  transform(date : Date) {
    /* Se extraen los datos de las fecha para formar la nueva fecha traducida */
    date = new Date(date);
    const fechaDia = date.getDate();
    const nombreDia = dias[date.getDay()];
    const nombreMes = meses[date.getUTCMonth()];
    const año = date.getFullYear();

    return `${nombreDia} ${fechaDia} de ${nombreMes} ${año}`
  }

}
