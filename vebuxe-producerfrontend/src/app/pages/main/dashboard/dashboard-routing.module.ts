import { APP_BASE_HREF } from "@angular/common";
import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { MoviesComponent } from "./movies/movies.component";
import { ProducersComponent } from "./producers/producers.component";


const routes: Routes = [
{path: '', component: DashboardComponent, children: [
  {path: '', redirectTo: 'movies'},
  {path:'movies', component: MoviesComponent},
  {path:'producers', component: ProducersComponent}
]}
];


@NgModule ({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})

export class  DashboardRoutingModule {}
