import { BrowserModule,Title } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DemoUtilsModule } from '../demo-utils/module';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartsModule } from 'ng2-charts';

import * as $ from 'jquery';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import {RouterModule, Routes} from '@angular/router';
import {CalendrierAComponent} from './absence/calendrier/calendrier.component';
// the second parame.
// ter 'fr' is optional
registerLocaleData(localeFr, 'fr');

import {
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSelectModule,
  MatTabsModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatBadgeModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatProgressBarModule,
  MatRadioButton, MatRadioModule, MatProgressSpinnerModule
} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TestComponent } from './test/test.component';
import {DialogOverviewExampleDialog, EmployeeComponent} from './employee/employee.component';
import {EmployeeService} from '../services/employee.service';
import {UploadFileService} from '../services/upload-file.service';
import { ListAploadComponent } from './list-apload/list-apload.component';
import {AuthService} from '../services/auth.service';
import { LoginComponent } from './login/login.component';
import {CongesComponent, DialogOverviewExampleDialog2} from './conges/conges.component';
import {CongesService} from '../services/conges.service';
import {CalendarModule} from 'angular-calendar';
import {CommonModule} from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InfoEmpComponent } from './employee/info-emp/info-emp.component';
import { AbsenceComponent } from './absence/absence.component';
import {PresenceComponent} from './presence/presence.component';
import {PresenceService} from '../services/presence.service';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import { RouterResolver } from './router.resolver';
import { DemanderComponent } from './conges/demander/demander.component';
import { CalendrierComponent } from './conges/calendrier/calendrier.component';
import { MesCongesComponent } from './conges/mes-conges/mes-conges.component';
import {DialogDescription, TraitementComponent} from './conges/traitement/traitement.component';
import { ImporterComponent } from './presence/importer/importer.component';
import { JustificationComponent } from './absence/justification/justification.component';
import {StagiaireRHComponent} from './stagiaire-rh/stagiaire-rh.component';
import {MessagerieComponent} from './messagerie/messagerie.component';
import {StagiaireCSComponent} from './stagiaire-cs/stagiaire-cs.component';
import { TraitJustificationComponent } from './absence/trait-justification/trait-justification.component';
import { StatistiqueComponent } from './statistique/statistique.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent,resolve: { crisis: RouterResolver }},

  { path: 'conges',component: CongesComponent,
    children: [
      {path: '',component: DemanderComponent,resolve: { crisis: RouterResolver }},
      {path: 'demander',component: DemanderComponent,resolve: { crisis: RouterResolver }},
      {path: 'calendrier',component: CalendrierComponent,resolve: { crisis: RouterResolver }},
      {path: 'mesconges',component: MesCongesComponent,resolve: { crisis: RouterResolver }},
      {path: 'traitement',component: TraitementComponent,resolve: { crisis: RouterResolver }}

    ],
    },
  { path: 'employes',
  children: [
    {path:'info',component: InfoEmpComponent,pathMatch: 'full',resolve: { crisis: RouterResolver }},
    {path:'',component: EmployeeComponent,pathMatch: 'full',resolve: { crisis: RouterResolver }}
  ]
  },
  { path: 'test',component: TestComponent},
  { path: 'statistique', component: StatistiqueComponent,resolve: { crisis: RouterResolver }},

  { path: 'absence',
    children: [
      {path:'calendrier',component: CalendrierAComponent,pathMatch: 'full',resolve: { crisis: RouterResolver }},
      {path:'justifier',component: JustificationComponent,pathMatch: 'full',resolve: { crisis: RouterResolver }},
      {path:'',component: AbsenceComponent,resolve: { crisis: RouterResolver }}

    ]
      },
  {path:'uploads',component: ListAploadComponent},
  {path:'login',component: LoginComponent},
  {path:'navbar',component: NavBarComponent},
  {path:'presence',
  children: [
    {path:'importation',component: ImporterComponent,resolve: { crisis: RouterResolver }},
    {path:'',component: PresenceComponent,resolve: { crisis: RouterResolver }}
  ]},
  { path: 'stagaireRH', component: StagiaireRHComponent,resolve: { crisis: RouterResolver }},
  { path: 'stagaireCS', component: StagiaireCSComponent,resolve: { crisis: RouterResolver }},
  { path: 'messagerie', component: MessagerieComponent,resolve: { crisis: RouterResolver }},
  { path: '**', redirectTo: '/home',pathMatch:'full'}
];

@NgModule({


  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    TestComponent,
    EmployeeComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog2,
    DialogDescription,
    ListAploadComponent,
    LoginComponent,
    CongesComponent,
    InfoEmpComponent,
    AbsenceComponent,
    PresenceComponent,
    DemanderComponent,
    CalendrierComponent,
    MesCongesComponent,
    TraitementComponent,
    ImporterComponent,
    CalendrierAComponent,
    JustificationComponent,

    StagiaireRHComponent,
    StagiaireCSComponent,
    MessagerieComponent,
    TraitJustificationComponent,
    StatistiqueComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    HighchartsChartModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatStepperModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true }),
    NgProgressModule.forRoot(),
    NgProgressRouterModule,
    NgProgressHttpModule,
    DemoUtilsModule,
    MatToolbarModule,
    ChartsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTabsModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSidenavModule,MatDatepickerModule,
    NoopAnimationsModule,MatCheckboxModule,
    MatFormFieldModule,MatIconModule,
    MatInputModule,MatBadgeModule,
    MatSnackBarModule,
    MatRadioModule
  ],
  providers: [EmployeeService,PresenceService,Title,UploadFileService,AuthService,CongesService,RouterResolver,NgProgressModule,{ provide: LOCALE_ID, useValue: "fr-FR" }],
  entryComponents: [ DialogOverviewExampleDialog,DialogOverviewExampleDialog2,DialogDescription],
  bootstrap: [AppComponent],
  exports: [TestComponent],
})
export class AppModule { }
