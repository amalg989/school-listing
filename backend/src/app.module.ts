import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SchoolModule } from './school/school.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/schoollistings', { useNewUrlParser: true }),
    SchoolModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
