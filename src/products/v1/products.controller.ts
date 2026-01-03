import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Request, NotFoundException, UseGuards, Put, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from '../products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto, UpdateStockDto } from '../dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { FiltersLowStockProductDto, FiltersProductDto } from '../dto/filters-product.dto';
import { Product } from '../entities/product.entity';
import { PaginatedProductResponseDto } from '../dto/paginated-product-response.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProductResponseDto } from '../dto/product-response.dto';
import { Error400ResponseDto } from '../../common/dto/error-400-response.dto copy';
import { Error404ResponseDto } from '../../common/dto/error-404-response.dto';
import { Error401ResponseDto } from '../../common/dto/error-401-response.dto copy';
import { ProductOwnershipGuard } from '../../auth/guards/product-ownership.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller({ path: 'products', version: '1' })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'created product',
    type: ProductResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: Error401ResponseDto
  })
  @ApiBadRequestResponse({
    type: Error400ResponseDto
  })
  create(@Body() input: CreateProductDto, @Request() req) {
    const userId = req.user.id;
    return this.productsService.create(input, userId);
  }

  @Get()
  @ApiOkResponse({
    description: 'get products',
    type: PaginatedProductResponseDto,
  })
  findAll(@Query() filters: FiltersProductDto) {
    return this.productsService.findAllPaginated(filters);
  }

  @Get('low-stock')
  @ApiOkResponse({
    description: 'get low stock products',
    type: [ProductResponseDto],
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  async lowStock(@Query() filters: FiltersLowStockProductDto) {
    const product = await this.productsService.findAll({
      threshold: filters.threshold
    });
    return product;
  }

  @Get('my-products')
  @ApiOkResponse({
    description: 'get my products',
    type: [ProductResponseDto],
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async myProducts(@Request() req) {
    const userId = req.user.id;
    const product = await this.productsService.findAll({
      userId: userId
    });
    return product;
  }

  @Get(':id')
  @ApiNotFoundResponse({
    type: Error404ResponseDto
  })
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);
    if (!product) {
      throw new NotFoundException(`product not found`);
    }
    return product;
  }


  @Put(':id/stock')
  @UseGuards(AuthGuard('jwt'), ProductOwnershipGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'updated product stock',
    type: ProductResponseDto,
  })
  @ApiBadRequestResponse({
    type: Error400ResponseDto
  })
  @ApiNotFoundResponse({
    type: Error404ResponseDto
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: Error401ResponseDto
  })
  updateStock(@Param('id') id: string, @Body() input: UpdateStockDto) {
    return this.productsService.update(+id, {
      stock: input.stock
    });
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), ProductOwnershipGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'updated product',
    type: ProductResponseDto,
  })
  @ApiBadRequestResponse({
    type: Error400ResponseDto
  })
  @ApiNotFoundResponse({
    type: Error404ResponseDto
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: Error401ResponseDto
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'), ProductOwnershipGuard)
  @ApiBearerAuth()
  @ApiNotFoundResponse({
    type: Error404ResponseDto
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: Error401ResponseDto
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }


}
