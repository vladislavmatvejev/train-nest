import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async findAll(): Promise<Country[]> {
    return await this.countryRepository.find();
  }
}
