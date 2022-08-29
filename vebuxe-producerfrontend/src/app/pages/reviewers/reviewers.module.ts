import { NgModule } from '@angular/core';


import { SharedModule } from 'src/app/shared/shared.module';
import { ReviewersComponent } from './reviewers.component';
import { ReviewersRoutingModule } from './reviewers.routing.module';

@NgModule({
  declarations: [
    ReviewersComponent
  ],
  imports: [
    SharedModule,
    ReviewersRoutingModule
  ]
})
export class ReviewersModule { }
