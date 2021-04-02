import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbrirAgendasComponent } from './abrir-agendas/abrir-agendas.component';
import { AgregarSintomaComponent } from './agregar-sintoma/agregar-sintoma.component';
import { MainComponent } from '../shared/main/main.component';
import { ConsultarAgendasComponent } from './consultar-agendas/consultar-agendas.component';
import { CuotaComponent } from './cuota/cuota.component';
import { CitasPendientesComponent } from './citas-pendientes/citas-pendientes.component';

/**
 * Enrutador para el módulo administrador 
 */

const routes: Routes = [

        {
            path:"",
            pathMatch : "full",
            redirectTo: "/admin/pendientes"
        },

        {
            path:"agendar",
            pathMatch : "prefix",
            component: AbrirAgendasComponent
        },
        {
            path:"sintomas",
            component: AgregarSintomaComponent
        },
        {
          path:"cuotas",
          component: CuotaComponent
        },
        {
          path:"pendientes",
          component : CitasPendientesComponent
        },
        {
          path:"consultarAgendas",
          component : ConsultarAgendasComponent
        }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdministradoRoutingModule { }