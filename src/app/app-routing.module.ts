import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { InvestmentsComponent } from './investments/investments.component';

const routes: Routes = [{
  path: "investments",
  component: InvestmentsComponent,
  canActivate: [AuthGuard]
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
