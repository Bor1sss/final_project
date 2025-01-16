import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  // Get all entities
  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  // Find category by ID
  async findOneById(id: number): Promise<Category | undefined> {
    return await this.categoryRepository.findOneBy({ id });
  }

  // Find subcategories by parent ID
  async findSubcategories(parentId: number): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: { parentCategoryId: parentId },
    });
  }

  // Add a new category
  async addCategory(
    name: string,
    parentCategoryId?: number
  ): Promise<Category> {
    const newCategory = this.categoryRepository.create({
      name,
      parentCategoryId: parentCategoryId || null,
    });
    return await this.categoryRepository.save(newCategory);
  }

  // Delete a category by ID
  async deleteCategory(id: number): Promise<boolean> {
    const result = await this.categoryRepository.delete(id);
    return result.affected > 0;
  }
}
