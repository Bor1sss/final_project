import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdEntity } from '../entities/ad.entity';
import { CreateAdDto } from '../dto/ad-dto/create-ad.dto';
import { UpdateAdDto } from '../dto/ad-dto/update-ad.dto';
import { User } from "../entities/user.entity";
import { Category } from "../entities/category.entity";

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(AdEntity)
    private adRepository: Repository<AdEntity>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createAdDto: CreateAdDto): Promise<AdEntity> {
    const { createdBy, categoryIds, ...adData } = createAdDto;

    // Validate user
    const user = await this.userRepository.findOneBy({ id: createdBy });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Validate categories
    const categories = categoryIds
      ? await this.categoryRepository.findByIds(categoryIds)
      : [];

    const newAd = this.adRepository.create({
      ...adData,
      createdBy: user,
      categories,
    });

    return await this.adRepository.save(newAd);
  }

  async findAll(): Promise<AdEntity[]> {
    return await this.adRepository.find({
      relations: ['createdBy', 'categories'],
    });
  }

  async findOne(id: number): Promise<AdEntity | null> {
    const ad = await this.adRepository.findOne({
      where: { id },
      relations: ['createdBy', 'categories'],
    });
    if (!ad) {
      throw new NotFoundException('Ad not found');
    }
    return ad;
  }

  async update(id: number, updateAdDto: UpdateAdDto): Promise<AdEntity> {
    const { categoryIds, ...adData } = updateAdDto;

    const ad = await this.adRepository.findOneBy({ id });
    if (!ad) {
      throw new NotFoundException('Ad not found');
    }

    // Validate categories if provided
    let categories = ad.categories;
    if (categoryIds) {
      categories = await this.categoryRepository.findByIds(categoryIds);
    }

    const updatedAd = this.adRepository.merge(ad, { ...adData, categories });
    return await this.adRepository.save(updatedAd);
  }

  async remove(id: number): Promise<void> {
    const ad = await this.adRepository.findOneBy({ id });
    if (!ad) {
      throw new NotFoundException('Ad not found');
    }
    await this.adRepository.delete(id);
  }
}
