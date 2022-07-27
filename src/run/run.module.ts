import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { RunController } from './controller/run.controller';
import { RunSchema } from './schema/run.schema';
import { RunService } from './service/run.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Run', schema: RunSchema }]),
    AuthModule
  ],
  controllers: [RunController],
  providers: [RunService]
})
export class RunModule { }
