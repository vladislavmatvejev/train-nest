import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Parcel } from './parcel.entity';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { filterByColumns } from './parcel.filter';

@Injectable()
export class ParcelService {
  constructor(
    @InjectRepository(Parcel)
    private parcelRepository: Repository<Parcel>,
  ) {}

  async create(parcel: CreateParcelDto): Promise<Parcel> {
    return await this.parcelRepository.save(parcel);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ parcels: Parcel[]; total: number }> {
    const [parcels, total] = await this.parcelRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return { parcels, total };
  }

  async findById(id: number): Promise<Parcel> {
    return await this.parcelRepository.findOne({ where: { id } });
  }

  async findBySku(sku: string): Promise<Parcel> {
    return await this.parcelRepository.findOneBy({ sku });
  }

  // get by query = parcels?columns={"country":"Estonia","description":"Some"}
  async findByColumns(columns: { [key: string]: any }, page: number = 1, limit: number = 10): Promise<{ parcels: Parcel[]; total: number }> {
    const findObj = {};
    Object.entries(columns)
      .filter(([key, value]) => {
        const columnOperator = filterByColumns[key]?.operator;

        if (columnOperator) {
          const isLike = columnOperator === 'LIKE';
          const paramValue = columnOperator === 'LIKE' ? `%${value}%` : value;
          
          findObj[key] = isLike ? Like(paramValue) : paramValue;
          return findObj;
        }

        return false;
      });

    const [parcels, total] = await this.parcelRepository.findAndCount({
      where: [findObj],
      skip: (page - 1) * limit,
      take: limit,
    });

    return { parcels, total };
  }

}
