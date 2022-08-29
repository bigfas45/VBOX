import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/main/dashboard/dashboard.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: "full"
  },

  {
    path: 'auth', component: AuthComponent
  },
  {
    path: 'main',
    loadChildren: ()=> import('./pages/main/main.module')
    .then(m => m.MainModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
