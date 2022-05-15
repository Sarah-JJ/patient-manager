import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AuthorizeGuard} from "./api-authorization/authorize.guard";
import {PatientListComponent} from "./patients/patient-list/patient-list.component";
import {PatientsComponent} from "./patients/patients.component";

const routes: Routes = [
  {
    path: 'patients',
    children: [
      {
        path: '',
        component: PatientListComponent
      },
      {
        path: ':id',
        component: PageNotFoundComponent
      }
    ],
    component: PatientsComponent,
    canActivate: [AuthorizeGuard],
  },
  { path: '',
    pathMatch: 'full' ,
    redirectTo: 'patients'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
