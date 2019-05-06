import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MeetingService } from '../service/meeting.service';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { Room } from '../room';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  rooms: Room[];
  constructor(private meetingService: MeetingService, public dialog: MatDialog) { }

  ngOnInit() {
    this.meetingService.getMeetingRooms(null).subscribe(rooms => {
      this.rooms = rooms;
    })
  }
  openDialog(room): void {
    const dialogRef = this.dialog.open(MeetingDetailsComponent, {
      //height: '400px',
      width: '800px',
      data: room
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}
