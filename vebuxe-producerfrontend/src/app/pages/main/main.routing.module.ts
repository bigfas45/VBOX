import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MoviesComponent } from './dashboard/movies/movies.component';
import { ProducersComponent } from './dashboard/producers/producers.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
        path: 'dashboard',
        loadChildren: ()=> import('./dashboard/dashboard.module')
        .then(m => m.DashboardModule)
      },
      {
        path: 'home-page',
        loadChildren: ()=> import('./home-page/home-page.module')
        .then(m => m.HomePageModule)
      },
      {
        path: 'settings',
        loadChildren: ()=> import('./settings/settings.module')
        .then(m => m.SettingsModule)
      },
      {
        path: 'reviewers',
        loadChildren: ()=> import('../reviewers/reviewers.module')
        .then(m => m.ReviewersModule)
      },


      {
        path: 'home-page',
        component: HomePageComponent

      }
    ]
  },



];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
