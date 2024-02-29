import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { AdminGuard } from './guard/admin.guard';
import { PublicGuard } from './guard/public.guard';
import { HomeComponent } from './pages/home/home.component';
import { UserListsComponent } from './pages/user-lists/user-lists.component';

const routes: Routes = [
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
  {
    path: "user",
    component: HomeComponent,
    children: [
      { path: "dashboard", component: DashboardComponent, canActivate: [AdminGuard]},
      { path: "user-list", component: UserListsComponent, canActivate: [AdminGuard]},
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ]
  },
  { path: '**', redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
