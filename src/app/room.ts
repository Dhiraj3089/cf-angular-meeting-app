export interface Room {
    room_id: Number;
    room_name: String;
    room_features: {
        has_tv: Boolean,
        has_projector: Boolean,
        has_system: Boolean
    };
    room_size:Number;
    bookings: Array<any>; 
}
