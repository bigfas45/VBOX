import { APP_BASE_HREF } from "@angular/common";
import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { SettingsComponent } from "./settings.component";


const routes: Routes = [
{path: '', component: SettingsComponent, children: [
  {path: '', redirectTo: 'change-password'},
  {path:'change-password', component: ChangePasswordComponent}
]}
];


@NgModule ({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})

export class  SettingsRoutingModule {}
