import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { AdEntity } from '../entities/ad.entity';
import { User } from '../entities/user.entity';
import { Category } from '../entities/category.entity';
import { CategoriesModule } from '../categories/categories.module'; // Import CategoriesModule

@Module({
  imports: [
    TypeOrmModule.forFeature([AdEntity, User, Category]),
    CategoriesModule // Add this
  ],
  providers: [AdsService],
  controllers: [AdsController],
  exports: [AdsService],
})
export class AdsModule {}
