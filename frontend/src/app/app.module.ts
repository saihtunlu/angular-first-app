import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { MaterialModule } from "./material/material.module";
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

// Auth interceptor
import { AuthInterceptorService } from "./core/interceptors/auth-interceptor.service";



/// store 
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { AppReducers, AppEffects } from './core/store/AppState';
import { NavBarComponent } from './mini-components/nav-bar/nav-bar.component';
import { StaffComponent } from './components/staff/staff.component';
import { DetectorComponent } from './mini-components/detector/detector.component';
import { StepperComponent } from './mini-components/stepper/stepper.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    StaffComponent,
    DetectorComponent,
    StepperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // store
    StoreModule.forRoot(AppReducers),
    EffectsModule.forRoot(AppEffects),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
