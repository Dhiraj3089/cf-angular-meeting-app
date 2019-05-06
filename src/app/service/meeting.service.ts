import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Room } from '../room';
@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  rooms: Room[];
  apiURL: String = 'http://localhost:6001/api/'
  constructor(private http: HttpClient) { 

  }

  getMeetingRooms(room_id) {
    this.rooms = [];
    let room = room_id ? `?id=${room_id}` : ''
    return this.http.get<Room[]>(`${this.apiURL}/rooms${room}`).pipe(
      map(data => {
        data.forEach(room => {
          return this.rooms.push({
            room_id: room.room_id,
            room_name: room.room_name,
            room_features:
              room.room_features,
            room_size: room.room_size,
            bookings: room.bookings
          });
        });
        return this.rooms;
      }));
  }

  bookMeeting(room_id, from_date, to_date) {
    return this.http.post(`${this.apiURL}/set-meeting`, {
      room_id, bookedFrom: from_date, bookedTo: to_date
    });
  }

  cancelMeeting(room_id, booking_id) {
    return this.http.post(`${this.apiURL}/cancel-meeting`, {
      room_id, booking_id
    });
  }

  updateMeeting(room_id, booking_id, from_date, to_date) {
    return this.http.post(`${this.apiURL}/update-meeting`, {
      room_id, booking_id, bookedFrom: from_date, bookedTo: to_date
    });
  }

}

