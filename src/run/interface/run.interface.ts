import { Date, Document } from 'mongoose';

export interface Run extends Document {
    userId: string;
    startDate: Date;
    endDate: Date;
    distance: number;
    emission: number;
    velocity: number[];
    snapshots: [{
        point: number[];
        time: number;
    }];
}
