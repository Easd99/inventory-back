import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactional } from 'typeorm-transactional';
import { FiltersCategoryDto } from './dto/filters-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  @Transactional()
  async create(input: CreateCategoryDto) {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: ILike(input.name) },
    });

    if (existingCategory) {
      throw new BadRequestException('category with this name already exists');
    }

    return await this.categoryRepository.save({
      name: input.name,
      description: input.description,
      active: input.active,
    });
  }

  async findAll(input: FiltersCategoryDto) {
    const queryBuilder = this.categoryRepository.createQueryBuilder('category');
    queryBuilder.orderBy({
      'category.id': 'ASC',
    });

    if (input.search) {
      queryBuilder.andWhere('category.name ILIKE :search OR category.description ILIKE :search', { search: `%${input.search}%` });
    }

    queryBuilder.loadRelationCountAndMap('category.productsCount', 'category.products');
    queryBuilder.skip(input.offset).take(input.limit);
    const [categories, total] = await queryBuilder.getManyAndCount();
    return {
      data: categories,
      total,
      limit: input.limit,
      offset: input.offset,
    };
  }

  async findOne(id: number) {
    const category = this.categoryRepository.findOne({
      where: { id },
    });
    return category;
  }

  @Transactional()
  async update(id: number, input: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException('category not found');
    }

    if (input.name && input.name !== category.name) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: input.name },
      });
      if (existingCategory) {
        throw new BadRequestException('category with this name already exists');
      }
      category.name = input.name;
    }
    if (input.description !== undefined) {
      category.description = input.description;
    }
    if (input.active !== undefined) {
      category.active = input.active;
    }

    return await this.categoryRepository.save(category);

  }


  @Transactional()
  async remove(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException('category not found');
    }

    if (category.products && category.products.length > 0) {
      throw new BadRequestException('cannot delete category with associated products');
    }

    await this.categoryRepository.softRemove(category);
  }
}
