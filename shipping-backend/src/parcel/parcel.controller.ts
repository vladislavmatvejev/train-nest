import { Controller, Get, Post, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ParcelService } from './parcel.service';
import { Parcel } from './parcel.entity';
import { CreateParcelDto } from './dto/create-parcel.dto';

@Controller('parcels')
export class ParcelController {
  constructor(private readonly parcelService: ParcelService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body('parcel') parcel: CreateParcelDto): Promise<Parcel> {
    console.log('checking', parcel);
    return this.parcelService.create(parcel);
  }

  @Get()
  async findAll(
    @Query('country') country?: string,
    @Query('description') description?: string,
  ): Promise<Parcel[]> {
    if (country) {
      return this.parcelService.findByCountry(country);
    } else if (description) {
      return this.parcelService.findByDescription(description);
    } else {
      return this.parcelService.findAll();
    }
  }
}
