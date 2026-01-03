import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './v1/products.controller';
import { CategoriesModule } from 'src/categories/categories.module';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoriesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule { }
