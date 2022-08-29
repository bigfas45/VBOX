import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieComponent } from './movie/movie.component';
import { ProducerComponent } from './producer/producer.component';
import { RouterModule } from '@angular/router';
import { HomePageRoutingModule } from './home-page-routing.module';
import { MovieCommentComponent } from './movie-comment/movie-comment.component';

@NgModule({
  declarations: [HomePageComponent, MovieComponent, ProducerComponent, MovieCommentComponent],
  imports: [SharedModule, HomePageRoutingModule],
})
export class HomePageModule {}
