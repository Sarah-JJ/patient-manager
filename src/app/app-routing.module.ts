import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: 'patients',
    children: [
      {
        path: '',
        component: PageNotFoundComponent
      },
      {
        path: ':id',
        component: PageNotFoundComponent
      }
    ],
    component: PageNotFoundComponent
  },
  { path: '',   redirectTo: '/patients', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
