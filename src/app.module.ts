import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RunModule } from './run/run.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb://' +
      process.env.MONGO_USER_NAME
      + ':' +
      process.env.MONGO_USER_PASSWORD
      + '@' +
      process.env.MONGO_IP_ADDRESS
      + ':' +
      process.env.MONGO_PORT
      + '/' +
      process.env.MONGO_DATABASE
    ),
    UserModule,
    AuthModule,
    RunModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
