import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TableComponent } from './table/table.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { QuillModule } from 'ngx-quill';
import {MatDialogModule} from '@angular/material/dialog';

import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { MovieTrailerDialogComponent } from './movie-trailer/movie-trailer-dialog.component';
import { MovieReviewDialogComponent } from './movie-review-dialog/movie-review-dialog.component';
import { ProducerDetailsEditdialogComponent } from './producer-details-editdialog/producer-details-editdialog.component';
import { CommentComponent } from './comment/comment.component'

const AngularMaterialComps = [
  MatButtonModule,
  MatListModule,
  MatSidenavModule,
  MatDividerModule,
  MatFormFieldModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatTableModule,
  MatIconModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    TableComponent,
    VideoplayerComponent,
    ChatRoomComponent,
    MovieTrailerDialogComponent,
    MovieReviewDialogComponent,
    ProducerDetailsEditdialogComponent,
    CommentComponent
  ],
  imports: [CommonModule, AngularMaterialComps, RouterModule, FormsModule, QuillModule.forRoot() ],
  exports: [CommonModule, AngularMaterialComps, RouterModule, FormsModule, TableComponent, VideoplayerComponent, QuillModule, CommentComponent],
  providers: [],
})
export class SharedModule {}
