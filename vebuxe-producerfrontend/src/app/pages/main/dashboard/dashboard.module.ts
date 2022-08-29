import { NgModule } from '@angular/core';


import { DashboardComponent } from './dashboard.component';
import { ProducersComponent } from './producers/producers.component';
import { MoviesComponent } from './movies/movies.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ProducersComponent,
    MoviesComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
