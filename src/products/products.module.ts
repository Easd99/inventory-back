import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './v1/products.controller';
import { CategoriesModule } from 'src/categories/categories.module';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoriesModule, UsersModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule { }
