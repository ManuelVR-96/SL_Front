import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgendaDTO } from '../models/AgendaDTO';
import { AperturaAgendaDTO } from '../models/AperturaAgendasDTO';
import { DatePipe } from '@angular/common';
import { TurnoDTO } from '../models/TurnoDTO';


@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para peticiones relacionadas a las agendas
 */
export class AgendaService {

  private urlEndPoint: string = 'http://localhost:8080/agendas/';
  private urlEndPoint_turnos: string = 'http://localhost:8080/turnos/';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpCliente : HttpClient, private datePipe : DatePipe) { }

  /**
   * Método para petición POST de agregar nueva cita
   * @param agenda {AperturaAgendaDTO} Data que contiene periodo de tiempo donde se busca abrir agenda y el id del médico
   * al cual se buscar abrir agenda
   * @returns Observable donde llegará el mensaje indicando éxito o fallo de la operación
   */
  saveAgenda(agenda: AperturaAgendaDTO) : Observable<any> {
    console.log(agenda)
    agenda.fechaInicio = this.datePipe.transform(agenda.fechaInicio, 'yyyy-MM-dd')
    agenda.fechaFinal = this.datePipe.transform(agenda.fechaFinal, 'yyyy-MM-dd')
    return this.httpCliente.post<any>(this.urlEndPoint, agenda, {'headers':this.httpHeaders})
  }

  /**
   * Método para petición GET de las fechas en que un médico ya tiene agenda abierta
   * @param idMedico {Number} id del médico del cual se buscan las fechas agendadas
   * @returns observable donde se extraerán lista de fechas
   */
  getFechasAgendadas(idMedico : number) : Observable<any[]> {
    return this.httpCliente.get<any[]>(`${this.urlEndPoint}fechasAgendadas/${idMedico}`)  
  }
  
  /**
   * Método para obtener mediante una petición GET, las agendas de un médico
   * @param idMedico {Number} id del médico del cual se buscan agendas
   * @returns {Observable<AgendaDTO[]>} Observable de donde se extraerá la lista de agendas del médico
   */
  getAgendaMedico(idMedico : number) : Observable<AgendaDTO[]> {
    return this.httpCliente.get<AgendaDTO[]>(`${this.urlEndPoint}agendasMedico/${idMedico}`)
  }

  /**
   * Método para petición GET donde se obtiene la lista de turnos de una agenda
   * @param idAgenda id de la agenda de la cual se buscan los turnos
   * @returns {Observable<TurnoDTO[]>} Observable de donde se extraerá la lista de turnos asociados a dicha agenda
   */
  getTurnosAgenda(idAgenda): Observable<TurnoDTO[]>{
    return this.httpCliente.get<TurnoDTO[]>(`${this.urlEndPoint_turnos}porAgenda/${idAgenda}`)
  }

  /**
   * Método para enviar petición GET que inicia proceso de agendamiento de citas
   * @returns Observable con mensaje de éxito o fallo de la operación
   */
  agendar(idUsuario:Number): Observable<any>{
    return this.httpCliente.get(`${this.urlEndPoint}agendar/${idUsuario}`)
  }

  /**
   * Método de apoyo para vaciar citas, agendas y turnos rápidamente
   * @returns Observable con mensaje de éxito o fallo de la operación
   */
  vaciar(): Observable<any>{
    return this.httpCliente.get(`${this.urlEndPoint}vaciar`)
  }

  /**
   * Método de apoyo para llenador masivo de agendas. Abre agendas por 2 meses (1 de Abril - 1 de Junio)
   * @returns Observable con mensaje de éxito o fallo de la operación
   */
  llenar(): Observable<any>{
    return this.httpCliente.get(`${this.urlEndPoint}agregar_muchas`)
  }

}
