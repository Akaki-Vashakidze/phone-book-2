import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { NumbersTableComponent } from './components/numbers-table/numbers-table.component';
import { NumbersComponent } from './components/numbers/numbers.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {path:'registration',component:RegistrationComponent},
  {path:'login',component:LogInComponent},
  {path:'numbers',component:NumbersTableComponent},
  {path:'',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
