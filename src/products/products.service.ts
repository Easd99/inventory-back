import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactional } from 'typeorm-transactional';
import { CategoriesService } from "../categories/categories.service";
import { FiltersProductDto } from './dto/filters-product.dto';

@Injectable()
export class ProductsService {


  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
  ) { }

  @Transactional()
  async create(input: CreateProductDto) {

    const existingProduct = await this.productsRepository.findOne({ where: { name: input.name } });
    if (existingProduct) {
      throw new BadRequestException('product with this name already exists');
    }

    const existingCategory = await this.categoriesService.findOne(input.categoryId);
    if (!existingCategory) {
      throw new NotFoundException('category not found');
    }

    return await this.productsRepository.save({
      name: input.name,
      description: input.description,
      stock: input.stock,
      price: input.price,
      category: { id: existingCategory.id },
    });

  }

  async findAll(input: FiltersProductDto) {
    const queryBuilder = this.productsRepository.createQueryBuilder('product');

    if (input.categoryId !== undefined) {
      queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId: input.categoryId });
    }
    if (input.search) {
      queryBuilder.andWhere('product.name ILIKE :search OR product.description ILIKE :search', { search: `%${input.search}%` });
    }

    queryBuilder.orderBy({
      'product.id': 'ASC',
    });
    queryBuilder.leftJoinAndSelect('product.category', 'category');
    queryBuilder.skip(input.offset).take(input.limit);
    const [products, total] = await queryBuilder.getManyAndCount();
    return {
      data: products,
      total,
      limit: input.limit,
      offset: input.offset,
    };
  }

  async findOne(id: number) {
    const product = this.productsRepository.findOne({
      where: { id }
    });
    if (!product) {
      return undefined;
    }
    return product;
  }

  @Transactional()
  async update(id: number, input: UpdateProductDto) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('product not found');
    }
    if (input.name && input.name !== product.name) {
      const existingProduct = await this.productsRepository.findOne({
        where: { name: input.name },
      });
      if (existingProduct) {
        throw new BadRequestException('product with this name already exists');
      }
      product.name = input.name;
    }
    if (input.description !== undefined) {
      product.description = input.description;
    }
    if (input.stock !== undefined) {
      product.stock = input.stock;
    }
    if (input.price !== undefined) {
      product.price = input.price;
    }
    if (input.categoryId !== undefined) {
      const existingCategory = await this.categoriesService.findOne(input.categoryId);
      if (!existingCategory) {
        throw new NotFoundException('category does not exist');
      }
      product.category = existingCategory;
    }
    return await this.productsRepository.save(product);
  }

  @Transactional()
  async remove(id: number): Promise<void> {
    const product = await this.productsRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('product not found');
    }

    await this.productsRepository.softRemove(product);
  }
}
