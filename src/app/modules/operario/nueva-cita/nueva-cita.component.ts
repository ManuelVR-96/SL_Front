import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { SintomaService } from 'src/app/services/sintoma.service';
import { EspecialidadDTO } from '../../../models/EspecialidadDTO';
import { SintomatologiaDTO } from '../../../models/Sintomatologia';
import { TipoCitaDTO } from '../../../models/TipoCitaDTO';
import { CuotaService } from '../../../services/cuota.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { CitasService } from '../../../services/citas.service';
import { AlertsService } from '../../../services/alerts.service';


@Component({
  selector: 'app-nueva-cita',
  templateUrl: './nueva-cita.component.html',
  styleUrls: ['./nueva-cita.component.css']
})
/**
 * Componente para agregar una nueva cita
 */
export class NuevaCitaComponent implements OnInit {

  form : FormGroup
  listaEspecialidades : EspecialidadDTO[]
  listaSintomas : SintomatologiaDTO[]
  listaTipoCitas : TipoCitaDTO[]
  // Referencia al formulario en el html para formatearlo al hacer un submit exitoso
  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(private fb: FormBuilder, private cuotaService : CuotaService, private sintomaService : SintomaService,
    private especialidadService : EspecialidadService, private citaService : CitasService, private alertsService : AlertsService) {
    this.form = fb.group({
      cedulaPaciente : [, [Validators.required, Validators.minLength(6), 
        Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      sintoma : [, [Validators.required]],
      especialidad : [, [Validators.required]],
      tipoCita : [, [Validators.required]]
    })
   }

  /**
   * Método OnInit donde se cargan los tipos de cita, los síntomas y las citas especialidades asociadas al síntoma elegido.
   * Se establece un observable en el campo síntomas para, al detectar un cambio, cargar las especialidades relacionadas al
   * síntoma seleccionado
   */
  ngOnInit(): void {

    this.cuotaService.getTiposCita().subscribe(
      tiposCita => {
        this.listaTipoCitas = tiposCita
        console.log(this.listaTipoCitas)
      },
      err => console.log(err)
    );

    this.sintomaService.getSintomas().subscribe(
      sintomas => {
        this.listaSintomas = sintomas
        console.log(this.listaSintomas)
      },
      err => console.log(err)
    )

    this.form.get("sintoma").valueChanges.subscribe(selectedValue => {
      if(selectedValue!=null){
        this.especialidadService.getEspecialidadesAsociadas(selectedValue).subscribe(
          response => {
            console.log(response),
            this.listaEspecialidades = response,
            console.log(this.listaEspecialidades)
          },
          err => console.log(err)
        )
      }
    }) 
  }

  /**
   * Método para manejar el submit del formulario. Se envía la data del formulario con la información de la cita solicitada.
   * Se informa mediante alertas del éxito o fracaso de la operación
   * @param e {Evento} Evitar el refresh de la página
   */
  onSubmit(e) {
    e.preventDefault();
    console.log(this.form.controls)
    this.citaService.saveCita(this.form.value).subscribe(
      cita => {
        console.log(cita)
        this.alertsService.showExito("Cita agregada con éxito", "")
        this.formDirective.resetForm()
      },
      err => {
        this.alertsService.showError(err, "No se pudo agregar la cita" , err.error.Error)
        console.log(err)
      }
    )
  }

}
