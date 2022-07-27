import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Date, Model } from 'mongoose';

import { RunDocument } from '../schema/run.schema';

@Injectable()
export class RunService {
    constructor(
        @InjectModel('Run') private readonly runModel: Model<RunDocument>
    ) { }

    async newRun(run: {
        userId: string,
        startDate: Date,
        endDate: Date,
        distance: number,
        emission: number,
        velocity: number[],
        snapshot: [{
            point: number[],
            time: number,
        }]
    }) {
        const newRun = new this.runModel(run);
        const result = await newRun.save();
        return result.id as string;
    }

    async getAllRunsByUserId(userId: string) {
        const runs = await this.runModel.find({ userId: userId }).exec();
        console.log(runs);
        return runs;
    }
}
