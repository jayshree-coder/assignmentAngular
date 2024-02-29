import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminGuard } from './guard/admin.guard';
import { PublicGuard } from './guard/public.guard';
const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'dashboard/default',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: LoginComponent,
    canActivate: [PublicGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [PublicGuard],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
