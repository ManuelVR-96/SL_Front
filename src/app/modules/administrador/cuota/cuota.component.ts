import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoCitaDTO } from 'src/app/models/TipoCitaDTO';
import { TipoContratoDTO } from '../../../models/TipoContratoDTO';
import { CuotaService } from '../../../services/cuota.service';
import { AlertsService } from '../../../services/alerts.service';
import { OperarioSessionDTO } from '../../../models/OperarioSession';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-cuota',
  templateUrl: './cuota.component.html',
  styleUrls: ['./cuota.component.css']
})
/**
 * Componente para modificar valor de cuotas moderadoras
 */
export class CuotaComponent implements OnInit {

  form : FormGroup
  listaTipoContratos : TipoContratoDTO[]
  listaTipoCitas : TipoCitaDTO[]
  usuarioActual : OperarioSessionDTO

  constructor(private fb: FormBuilder, private cuotaService : CuotaService, private alertService : AlertsService,
    private usuarioService: UserService) {
     
    this.form = this.fb.group({
      valorCuotaModeradora : [0, [Validators.required]],
      idTipoContrato : [,[Validators.required]],
      idTipoCita : [,[Validators.required]],
    })
  }
  /**
   * Método OnInit donde se cargan los tipos de citas y los tipos de contrato.
   */
  ngOnInit(): void {
    this.usuarioActual = this.usuarioService.getUser()
    this.cuotaService.getTiposCita().subscribe(
      tiposCitas => {
        this.listaTipoCitas = tiposCitas;
        console.log("Tipos cita - " + this.listaTipoCitas)
      }, 
      err => this.alertService.showError(err, "", "")
    )

    this.cuotaService.getTiposContrato().subscribe(
      tiposContrato => {
        this.listaTipoContratos = tiposContrato;
        console.log("Tipos contrato - " + this.listaTipoCitas)
      }, 
      err => this.alertService.showError(err, "", "")
    )
  }
  /**
   * Método para manejar el submit. Se envía el formulario como parámetro a la petición de modificación
   * @param e Evento para evitar recarga de la página al submitear
   */
  onSubmit(e){
    e.preventDefault()
    console.log(this.form.value)
    this.cuotaService.saveCuota(this.form.value, this.usuarioActual.idOperario).subscribe(
      resp => {
        console.log(resp)
        this.alertService.showExito("Modifación exitosa!!", "El valor de la cuota moderadora ha sido modificado")
      },
      err => {
        console.log(err)
        this.alertService.showError(err, "Cuota Moderadora no encontrada", "No se ha encontrado la cuota moderadora a modificar")
      }
    )
  }

}
