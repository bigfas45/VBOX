import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MainComponent } from './main.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MainRoutingModule } from './main.routing.module';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    SidenavComponent,
  ],
  imports: [
    SharedModule,
    MainRoutingModule,
    FormsModule,
  ],
  providers: [],
})
export class MainModule { }
