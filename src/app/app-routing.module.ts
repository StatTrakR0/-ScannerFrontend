import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {MovementsComponent} from './movements/movements.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'movements', component: MovementsComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
