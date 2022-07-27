import { Header, Body, Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { Date } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthService } from 'src/auth/service/auth.service';
import { RunService } from '../service/run.service';

@Controller('run')
export class RunController {
    constructor(
        private readonly runService: RunService,
        private readonly authService: AuthService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('newRun')
    async addRun(
        @Request() req,

        @Body('startDate') startDate: Date,
        @Body('endDate') endDate: Date,
        @Body('distance') distance: number,
        @Body('emission') emission: number,
        @Body('velocity') velocity: number[],
        @Body('snapshot') snapshot: [{
            point: number[],
            time: number,
        }]
    ) {
        const userId = req.user.userId;
        await this.runService.newRun({
            userId,
            startDate,
            endDate,
            distance,
            emission,
            velocity,
            snapshot
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllRuns(@Request() req) {
        const userId = req.user.userId;
        return (await this.runService.getAllRunsByUserId(userId));
    }
}
