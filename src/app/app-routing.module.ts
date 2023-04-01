import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/Error404/Error404.component';


const routes: Routes = [
  {
    path: "admin",
    loadChildren: () => import('./administration/administration.module').then(m => m.administrationModule),
  },

  { path: "**", component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
