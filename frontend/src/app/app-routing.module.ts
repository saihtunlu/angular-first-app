import { StaffComponent } from './components/staff/staff.component';
import { GuestGuard } from './core/guards/guest.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', canActivate:[AuthGuard], children: [
    { path : '', component: HomeComponent },
    { path : 'staff', component: StaffComponent },
  ]},
  {path: '', canActivate:[GuestGuard], children: [
    { path : 'login', component: LoginComponent },
    { path : 'register', component: RegisterComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
