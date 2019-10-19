import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestmentsComponent } from './investments/investments.component';


const routes: Routes = [{
  path: "investments",
  component: InvestmentsComponent
},
{
  path: "login",
  component: AuthComponent
},
{
  path: '**',
  redirectTo: 'login',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
