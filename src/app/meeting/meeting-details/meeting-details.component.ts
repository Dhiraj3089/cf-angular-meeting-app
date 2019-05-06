import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { MeetingService } from 'src/app/service/meeting.service';



const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class MeetingDetailsComponent implements OnInit {
  date = new FormControl(moment());
  fromDate: any;
  toDate: any;
  changeId: String;
  bookings: any;
  fromTimeHrs: Number;
  fromTimeMinutes: Number;
  toTimeHrs: Number;
  toTimeMinutes: Number;
  minutes: any = [];
  hrs: any = [];
  bookedFromTimeHrs: Number;
  bookedFromTimeMinutes: Number;
  bookedToTimeHrs: Number;
  bookedToTimeMinutes: Number;
  constructor(public dialogRef: MatDialogRef<MeetingDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private meetingService: MeetingService) { }

  ngOnInit() {
    this.meetingService.getMeetingRooms(this.data.room_id).subscribe(room => {
      this.bookings = room[0].bookings;
    });
    for (let i = 0; i < 24; i++) {
      if (i < 10)
        this.hrs.push('0' + i);
      else
        this.hrs.push(i);
    }
    for (let i = 0; i < 60; i++) {
      if (i < 10)
        this.minutes.push('0' + i);
      else
        this.minutes.push(i);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onCancelMeeting(room_id, booking_id): void {
    if (confirm("Are you sure to you want to cancel the meeting?")) {
      this.meetingService.cancelMeeting(room_id, booking_id).subscribe(data => {
        this.bookings = data["bookings"];
      })
    }
  }

  onChange(id) {
    this.changeId = id;
  }

  onCancelUpdate() {
    this.changeId = null;
    this.fromTimeHrs = null;
    this.fromTimeMinutes = null;
    this.toTimeHrs = null;
    this.toTimeMinutes = null;

  }

  onUpdate(room_id, booking) {
    if (this.fromTimeHrs && this.fromTimeMinutes) {
      if (confirm("Are you sure to you want to update the current meeting time")) {
        const fromDate = `${moment(booking.room_booked_from).format('YYYY-MM-DD')} ${this.fromTimeHrs}:${this.fromTimeMinutes}:00`
        const toDate = `${moment(booking.room_booked_from).format('YYYY-MM-DD')} ${this.toTimeHrs}:${this.toTimeMinutes}:00`
        this.meetingService.updateMeeting(room_id, booking.booking_id, fromDate, toDate).subscribe(data => {
          this.bookings = data["bookings"];
          this.onCancelUpdate();
        }, err => {
          alert(err.error.error);
        })
      } else {
        this.onCancelUpdate();
      }
    }
  }

  onBooking(room_id) {
    if (this.fromDate && this.bookedFromTimeHrs && this.bookedToTimeMinutes) {
      const fromDate = `${moment(this.fromDate).format("YYYY-MM-DD")} ${this.bookedFromTimeHrs}:${this.bookedFromTimeMinutes}:00`;
      const toDate = `${moment(this.fromDate).format("YYYY-MM-DD")} ${this.bookedToTimeHrs}:${this.bookedToTimeMinutes}:00`
      this.meetingService.bookMeeting(room_id, fromDate, toDate).subscribe(data => {
        this.bookings = data["bookings"];
      }, err => {
        alert(err.error.error);
      })
    }
  }

}
