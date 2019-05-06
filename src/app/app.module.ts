import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule, MatCheckboxModule,MatCardModule
  ,MatIconModule,MatGridListModule
  ,MatDialogModule
  ,MatFormFieldModule
  ,MatInputModule
  ,MatListModule
  ,MatDatepickerModule
  ,MatNativeDateModule
} from '@angular/material';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeetingComponent } from './meeting/meeting.component';
import { MeetingDetailsComponent } from './meeting/meeting-details/meeting-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MeetingComponent,
    MeetingDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  entryComponents:[MeetingDetailsComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
