import { Component, OnInit, ViewChild } from '@angular/core';
import { SintomaService } from '../../../services/sintoma.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { EspecialidadDTO } from '../../../models/EspecialidadDTO';
import { EspecialidadService } from '../../../services/especialidad.service';
import { PrioridadSintomaDTO } from 'src/app/models/PrioridadSintomaDTO';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-agregar-sintoma',
  templateUrl: './agregar-sintoma.component.html',
  styleUrls: ['./agregar-sintoma.component.css']
})
/**
 * Componente para agregar nuevo síntomas
 */
export class AgregarSintomaComponent implements OnInit {

  form : FormGroup;
  listaEspecialidades : EspecialidadDTO[];
  listaPrioridades : PrioridadSintomaDTO[]
  // Referencia al formulario para researlo una vez se haga el submit
  @ViewChild('formDirective') private formDirective : NgForm;
  constructor(private sintomaService: SintomaService, private fb: FormBuilder, private especialidadService : EspecialidadService,
    private alertsService: AlertsService) {
    this.form = fb.group({
      descSintoma : ['', [Validators.required]],
      idPrioridad : [, [Validators.required]],
      especialidadesAsociadas : [[], Validators.required]
    })
  }
  /**
   * En el método onIniti se solicitan las especialidades y las prioridades
   */
  ngOnInit(): void {
    //this.sintomaService.getCuentas().subscribe(cuenta => console.log(cuenta[0].constructor.name))
    this.especialidadService.getEspecialidades().subscribe(especialidades => {
      this.listaEspecialidades = especialidades 
      console.log(this.listaEspecialidades)
    })

    this.sintomaService.getPrioridades().subscribe(prioridades => {
      this.listaPrioridades = prioridades;
      console.log(this.listaPrioridades)
    })
  }
  /**
  * Método para manejar el submit del formulario. 
  * Se envía la data del formulario y emite una alerta indicando el éxito o el error del proceso
  */
  onSubmit(e){
    e.preventDefault;
    console.log(this.form.value)
    this.sintomaService.saveSintomas(this.form.value).subscribe(
      resp => {
        this.alertsService.showExito(`Síntoma ${this.form.get('descSintoma').value } ha sido agregado con éxito`, 
      "Ahora podrá seleccionarlo en registro de citas")
      this.formDirective.resetForm()
      },
      err => this.alertsService.showError(err, "Duplicado", "Este síntoma ya está registrado en la base de datos")
    )
  }
}

  

