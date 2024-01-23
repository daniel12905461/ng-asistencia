import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { ListFuncionarioComponent } from './list-funcionario/list-funcionario.component';
import { ListHorariosComponent } from './list-horarios/list-horarios.component';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { ListUbicacionesComponent } from './list-ubicaciones/list-ubicaciones.component';
import { ListPermisosComponent } from './list-permisos/list-permisos.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children:[
      {
        path:'inicio',
        component: HomeComponent,
      },
      {
        path:'funcionarios',
        component: ListFuncionarioComponent,
        // canActivate: [AuthGuardService]
      },
      {
        path:'horarios',
        component: ListHorariosComponent,
        // canActivate: [AuthGuardService]
      },
      {
        path:'roles',
        component: ListRolesComponent,
        // canActivate: [AuthGuardService]
      },
      {
        path:'ubicaciones',
        component: ListUbicacionesComponent,
        // canActivate: [AuthGuardService]
      },
      {
        path:'permisos',
        component: ListPermisosComponent,
        // canActivate: [AuthGuardService]
      },
      {
        path: 'reportes',
        loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
