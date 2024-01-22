import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateParcelDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  sku: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  streetAddress: string;

  @IsString()
  @IsNotEmpty()
  town: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  deliveryDate: Date;
}
