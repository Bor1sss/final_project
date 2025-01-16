import { IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, IsDecimal } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsDecimal({ decimal_digits: '0,2' })
  price: number;

  @IsOptional()
  @ApiProperty()
  @IsString()
  imageUrl?: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  createdBy: number;

  @IsOptional()
  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds?: number[];
}
