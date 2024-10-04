import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Composants/chercher/login/login.component';
import { DashboardComponent } from './Composants/chercher/dashboard/dashboard.component';
import { ChercherComponent } from './Composants/chercher/chercher/chercher.component';
import { TableauComponent } from './Composants/chercher/tableau/tableau.component';
import { SignupComponent } from './Composants/chercher/signup/signup.component';
import { ChercherUserComponent } from './Composants/chercher/chercher-user/chercher-user.component';
import { TableauUserComponent } from './Composants/chercher/tableau-user/tableau-user.component';
import { DashboardUserComponent } from './Composants/chercher/dashboard-user/dashboard-user.component';





const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'chercher', component: ChercherComponent },
  { path: 'tableau', component: TableauComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'ChercherUser', component: ChercherUserComponent },
  { path: 'TableauUser', component: TableauUserComponent },
  { path: 'DashboardUser', component: DashboardUserComponent }
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
