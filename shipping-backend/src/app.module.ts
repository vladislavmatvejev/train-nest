import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParcelModule } from './parcel/parcel.module';
import { dbdatasource } from './db/data.source';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(dbdatasource), ParcelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
