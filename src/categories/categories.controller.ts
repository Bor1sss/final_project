import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '../entities/category.entity';
import { Public } from '../decorators/public.decorator';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateCategoryDto } from '../dto/category-dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }

  @Public()
  @Get(':id')
  async findOneById(
    @Param('id') id: number
  ): Promise<Category | undefined> {
    return await this.categoriesService.findOneById(id);
  }

  @Public()
  @Get('subcategories/:parentId')
  async findSubcategories(
    @Param('parentId') parentId: number
  ): Promise<Category[]> {
    return await this.categoriesService.findSubcategories(parentId);
  }

  @ApiBearerAuth()
  @ApiBody({ type: CreateCategoryDto })
  @Post()
  async addCategory(
    @Body('name') name: string,
    @Body('parentCategoryId') parentCategoryId?: number
  ): Promise<Category> {
    return await this.categoriesService.addCategory(name, parentCategoryId);
  }

  @ApiBearerAuth()
  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<{ success: boolean }> {
    const success = await this.categoriesService.deleteCategory(id);
    return { success };
  }
}
