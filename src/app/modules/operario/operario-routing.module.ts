import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevaCitaComponent } from './nueva-cita/nueva-cita.component';
import { CitasClienteComponent } from './citas-cliente/citas-cliente.component';

/**
 * Enrutador para el módulo de operarios
 */

const routes: Routes = [

        {
          path:"",
          pathMatch : "full",
          redirectTo: "/operario/nuevaCita"
        },
        {
            path:"nuevaCita",
            pathMatch : "prefix",
            component: NuevaCitaComponent
        },
        {
          path:"citasCliente",
          pathMatch : "prefix",
          component: CitasClienteComponent
        }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OperarioRoutingModule { }