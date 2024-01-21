import { Module } from '@nestjs/common';
import { ParcelService } from './parcel.service';
import { ParcelController } from './parcel.controller';
// TypeOrmModule creates your database integration
import { TypeOrmModule } from '@nestjs/typeorm'; 
// Your Task entity class
import { Parcel } from './parcel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parcel])], 
  providers: [ParcelService],
  controllers: [ParcelController]
})
export class ParcelModule {}
