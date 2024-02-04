import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { ParcelService } from './parcel.service';
import { Parcel } from './parcel.entity';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { parseJson } from '../common/utils';

@Controller('parcels')
export class ParcelController {
  constructor(private readonly parcelService: ParcelService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body('parcel') parcel: CreateParcelDto): Promise<Parcel> {
    return await this.parcelService.create(parcel);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('columns') columns?: string,
  ): Promise<{ parcels: Parcel[]; total: number }> {
    let result;

    if (columns) {
      let columnObject;
      const columnParsed = parseJson(columns);

      if (columnParsed.error) {
        columnObject = {};
      } else {
        columnObject = columnParsed.data;
      }

      result = await this.parcelService.findByColumns(
        columnObject,
        page,
        limit,
      );
    } else {
      result = await this.parcelService.findAll(page, limit);
    }

    return result;
  }

  @Get('/:id')
  async findById(@Param('id') id: number) {
    return await this.parcelService.findById(id);
  }

  @Get('/:sku')
  async findBySku(@Param('sku') sku: string): Promise<Parcel> {
    return await this.parcelService.findBySku(sku);
  }
}
