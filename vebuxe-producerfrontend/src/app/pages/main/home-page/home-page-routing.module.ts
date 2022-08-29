import { APP_BASE_HREF } from "@angular/common";
import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home-page.component";
import { MovieCommentComponent } from "./movie-comment/movie-comment.component";
import { MovieComponent } from "./movie/movie.component";
import { ProducerComponent } from "./producer/producer.component";



const routes: Routes = [
{path: '', component: HomePageComponent, children: [
  {path: '', redirectTo: 'movie', pathMatch:  'full' },
  {path:'movie/:moveId', component: MovieComponent},
  {path:'movie/:movieId/movie-comment', component: MovieCommentComponent},
  {path:'producer', component: ProducerComponent}
]}
];


@NgModule ({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})

export class  HomePageRoutingModule {}


