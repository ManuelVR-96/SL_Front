import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CitasService } from '../../../services/citas.service';
import { CitaDTO } from '../../../models/CitaDTO';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-citas-cliente',
  templateUrl: './citas-cliente.component.html',
  styleUrls: ['./citas-cliente.component.css']
})
/**
 * Componente para visualizar las citas de un cliente
 */
export class CitasClienteComponent implements OnInit {

  form : FormGroup
  page : number = 1
  citasPaciente : CitaDTO[] = [];
  solicitado : boolean = false
  constructor(private fb : FormBuilder, private citaService : CitasService, private alertsService : AlertsService) {
    this.form = fb.group({
      cedulaPaciente : [, [Validators.required, Validators.minLength(6), 
        Validators.maxLength(10), Validators.pattern('[0-9]*')]]
    })
   }

  ngOnInit(): void {
  }

  
 /**
  * Método para cancelar citas. Envía un citaDTO a la petición de update
  * Se emite una alerta pidiendo confirmar la acción y posteriormente, una confirmando la acción realizada
  * @param idCita {number} id de la cita a cancelar
  * @param idTurno {number} id del turno ligado a dicha cita
  */
  cancelar(idCita: number, idTurno:number){
    console.log(idCita, idTurno)
    this.alertsService.showConfirm("Está seguro de cancelar la cita?", "No podrá revertir esta acción").then(
      result => {
        if (result.isConfirmed){
          this.citaService.cancelCita({
            idCita:idCita,
            idTurno:idTurno
          }).subscribe(
            resp =>{
              this.alertsService.showExito("Cita cancelada con éxito", "")
              this.citaService.getCitasPaciente(this.form.get("cedulaPaciente").value).subscribe(
                citas => this.citasPaciente = citas
              )
            },
            err => this.alertsService.showError(err, "Cita no encontrada", "")
          )
        }
      }
    )   
  }
  /**
   * Método para manejar el submit del formulario. Se envía la cédula ingresada y se cargan las citas relacionadas
   * a dicho paciente, si existen. Si el paciente no existe, se informará mediante una alerta
   * Se reinicia, además, la página del paginador en caso de encontrar citas
   */
  onSubmit(){
    this.citaService.getCitasPaciente(this.form.get("cedulaPaciente").value).subscribe(
      citasPaciente => {
        this.citasPaciente = citasPaciente
        console.log(this.citasPaciente)
        this.solicitado = true
        this.page=1
      },
      err => {
        this.solicitado = false
        console.log(err)
        this.alertsService.showError(err, "EL paciente no existe","La cédula ingresada, no coincide con la de ningún paciente registrado")
      }
    )
  }

}
