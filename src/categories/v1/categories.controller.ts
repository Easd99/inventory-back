import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Put, NotFoundException, Query } from '@nestjs/common';
import { CategoriesService } from '../categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { FiltersCategoryDto } from '../dto/filters-category.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { CategoryResponseDto } from '../dto/category-response.dto';
import { PaginatedCategoryResponseDto } from '../dto/paginated-category-response.dto';

@Controller({ path: 'categories', version: '1' })
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }


  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'created category',
    type: CategoryResponseDto,
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'get categories',
    type: PaginatedCategoryResponseDto,
  })
  findAll(@Query() query: FiltersCategoryDto) {
    return this.categoriesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoriesService.findOne(+id);
    if (!category) {
      throw new NotFoundException(`category not found`);
    }
    return category;
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'updated category',
    type: CategoryResponseDto,
  })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
