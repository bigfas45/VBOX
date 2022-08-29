import { APP_BASE_HREF } from "@angular/common";
import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { ReviewersComponent } from "./reviewers.component";

const routes: Routes = [
{path: '', component: ReviewersComponent, children: [
  // {path: '', redirectTo: 'change-password'},

]}
];


@NgModule ({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})

export class  ReviewersRoutingModule {}
