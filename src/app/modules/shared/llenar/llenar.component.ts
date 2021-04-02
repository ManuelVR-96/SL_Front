import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../../services/citas.service';
import { AgendaService } from '../../../services/agenda.service';
import { AlertsService } from '../../../services/alerts.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-llenar',
  templateUrl: './llenar.component.html',
  styleUrls: ['./llenar.component.css']
})
export class LlenarComponent implements OnInit {

  constructor(private citaService : CitasService, private agendaService: AgendaService, private alertService: AlertsService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  /**
   * Método para vaciar todas las citas, agendas y turnos
   */
  vaciar(){
    this.spinner.show()
    console.log("vaciar")
    this.agendaService.vaciar().subscribe(
      resp => {
        this.spinner.hide()
        this.alertService.showExito("Agendas vaciadas", "La lista de agendas está vacía ahora")
      },
      err => {
        this.alertService.showError(err, "No se pudo vaciar la agenda", ""),
        this.spinner.hide()
      }
    )
  }

  /**
   * Método para llenar agendas por el lapso de un mes
   */
  llenar_agendas(){
    this.spinner.show()
    this.agendaService.llenar().subscribe(
      resp => {
      this.spinner.hide()
      this.alertService.showExito("Agendas llenas", "Ahora tiene agendas llenas del 1 de Mayo al 1 de Julio del 2021")
      },
      err => {
        this.alertService.showError(err, "Algunas agenda no pudieron llenarse", "Asegúrese de que no existían agendas para dicha fecha")
        this.spinner.hide()
      }
    )
  }

  /**
   * Método para llenar citas, haciendo una combinatoria entre pacientes,sintomas, especialidades y tipos de cita
   */
  llenar_citas(){
    this.spinner.show()
    this.citaService.agregar_masivo().subscribe(
      resp => {
      this.spinner.hide()
      this.alertService.showExito("Citas llenas", "Ahora tiene citas con cada paciente, con cada síntoma, con cada especialidad, con cada tipo de cita")
      },
      err => {
        this.alertService.showError(err, "No se pudieron agregar citas", "")
        this.spinner.hide()
      }
    )
  }
  

}
