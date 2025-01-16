import { IsNumber, IsOptional, IsString, IsArray, IsDecimal } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";


export class UpdateAdDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @ApiProperty()
  @IsDecimal({ decimal_digits: '0,2' })
  price?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  imageUrl?: string;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  @IsNumber({}, { each: true })
  categoryIds?: number[];
}
