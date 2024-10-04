import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Composants/chercher/login/login.component';
import { DashboardComponent } from './Composants/chercher/dashboard/dashboard.component';
import { ChercherComponent } from './Composants/chercher/chercher/chercher.component';
import { HttpClientModule } from '@angular/common/http';
import { EditCvComponent } from './Composants/chercher/edit-cv/edit-cv.component';
import { TableauComponent } from './Composants/chercher/tableau/tableau.component'; //// we imported this
import { FilterPipe } from './pipes/filter.pipe';
import { FilterCandidatPipe } from './pipes/filter-candidat.pipe';
import { FilterPostePipe } from './pipes/filter-poste.pipe';
import { FilterUniPipe } from './pipes/filter-uni.pipe';
import { FilterNiveauPipe } from './pipes/filter-niveau.pipe';
import { FilterIdPipe } from './pipes/filter-id.pipe';
import { FilterYearsPipe } from './pipes/filter-years.pipe';
import { FilterMailPipe } from './pipes/filter-mail.pipe';
import { FilterTelPipe } from './pipes/filter-tel.pipe';
import { FilterUrlPipe } from './pipes/filter-url.pipe';
import { FilterCompPipe } from './pipes/filter-comp.pipe';
import { FilterFormaPipe } from './pipes/filter-forma.pipe';
import { FilterExpPipe } from './pipes/filter-exp.pipe';
import { FilterLanguePipe } from './pipes/filter-langue.pipe';
import { FilterPolePipe } from './pipes/filter-pole.pipe';
import { FilterExpCompDetPipe } from './pipes/filter-exp-comp-det.pipe';
import { SignupComponent } from './Composants/chercher/signup/signup.component';
import { ChercherUserComponent } from './Composants/chercher/chercher-user/chercher-user.component';
import { TableauUserComponent } from './Composants/chercher/tableau-user/tableau-user.component';
import { DashboardUserComponent } from './Composants/chercher/dashboard-user/dashboard-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ChercherComponent,
    EditCvComponent,
    TableauComponent,
    FilterPipe,
    FilterCandidatPipe,
    FilterPostePipe,
    FilterUniPipe,
    FilterNiveauPipe,
    FilterIdPipe,
    FilterYearsPipe,
    FilterMailPipe,
    FilterTelPipe,
    FilterUrlPipe,
    FilterCompPipe,
    FilterFormaPipe,
    FilterExpPipe,
    FilterLanguePipe,
    FilterPolePipe,
    FilterExpCompDetPipe,
    SignupComponent,
    ChercherUserComponent,
    TableauUserComponent,
    DashboardUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule // TO add this
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
