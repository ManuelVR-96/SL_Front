import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivateChild } from '@angular/router';
import { MainComponent } from './modules/shared/main/main.component';
import { LoginComponent } from './modules/shared/login/login.component';
import { AbrirAgendasComponent } from './modules/administrador/abrir-agendas/abrir-agendas.component';
import { AdminGuard } from './guards/admin.guard';
import { OperarioGuard } from './guards/operario.guard';
import { LlenarComponent } from './modules/shared/llenar/llenar.component';

/**
 * Router general de la aplicación
 */
const routes: Routes = [
  // Ruta del login
  {path: "login", component:LoginComponent},
  {path: "", pathMatch:'full', redirectTo:'/login'}, 
  // Rutas de administrador y operario, cargados de manera perezosa.
  {
    path: '', component: MainComponent, children: [
      { path: 'admin', loadChildren: () => import(`./modules/administrador/administrador.module`).then(m => m.AdministradorModule), canActivate:[AdminGuard] },
      { path: 'operario', loadChildren: () => import(`./modules/operario/operario.module`).then(m => m.OperarioModule), canActivate:[OperarioGuard] },
    ]
  },
  {path: "hide", component:LlenarComponent},
  {path : "**", redirectTo:"/login", pathMatch:"full"}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

