// src/parcels/parcel.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Parcel } from './parcel.entity';
import { CreateParcelDto } from './dto/create-parcel.dto';

@Injectable()
export class ParcelService {
  constructor(
    @InjectRepository(Parcel)
    private parcelRepository: Repository<Parcel>,
  ) {}

  async create(parcel: CreateParcelDto): Promise<Parcel> {
    return this.parcelRepository.save(parcel);
  }

  async findAll(): Promise<Parcel[]> {
    return this.parcelRepository.find();
  }

  async findByCountry(country: string): Promise<Parcel[]> {
    return this.parcelRepository.find({ where: { country } });
  }

  async findByDescription(description: string): Promise<Parcel[]> {
    return this.parcelRepository.findBy({
        description: Like(`%${description}%`)
    });
  }
}
