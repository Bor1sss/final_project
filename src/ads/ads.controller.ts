import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ConflictException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdDto } from '../dto/ad-dto/create-ad.dto';
import { UpdateAdDto } from '../dto/ad-dto/update-ad.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser } from '../interfaces/request-with-user.interface';
import { Public } from "../decorators/public.decorator";

@ApiTags('Ads')
@Controller('ads')
@ApiBearerAuth()
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @ApiOperation({ summary: 'Create a new ad' })
  @ApiBody({ type: CreateAdDto })
  @Post()
  @UseGuards(AuthGuard) // Ensure user is authenticate
  async create(@Body() createAdDto: CreateAdDto, @Req() req: RequestWithUser) {
    try {
      const userId = req.user.id;
      createAdDto.createdBy = userId;
      return await this.adsService.create(createAdDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get()
  @Public()
  findAll() {
    return this.adsService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: number) {
    const ad = await this.adsService.findOne(id);
    if (!ad) {
      throw new NotFoundException('Ad not found');
    }
    return ad;
  }

  @ApiOperation({ summary: 'Update an exist ad' })
  @ApiBody({ type: UpdateAdDto })
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateAdDto: UpdateAdDto) {
    try {
      return await this.adsService.update(id, updateAdDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.adsService.remove(id);
      return { message: 'Ad successfully deleted' };
    } catch {
      throw new NotFoundException('Ad not found');
    }
  }
}
