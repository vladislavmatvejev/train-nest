import { Module } from '@nestjs/common';
import { ParcelService } from './parcel.service';
import { ParcelController } from './parcel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parcel } from './parcel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parcel])],
  providers: [ParcelService],
  controllers: [ParcelController],
})
export class ParcelModule {}
