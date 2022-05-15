import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AuthorizeGuard} from "./api-authorization/authorize.guard";
import {AppComponent} from "./app.component";

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
    component: AppComponent
  },
  { path: '',
    pathMatch: 'full' ,
    canActivate: [AuthorizeGuard],
    component: PageNotFoundComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
