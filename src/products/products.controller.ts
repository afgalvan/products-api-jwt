import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { RequestError } from './../shared/errors/RequestError';
import { CreateProduct } from './dto/product.request';
import { ProductResponse } from './dto/product.response';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  @ApiOkResponse({
    description: '',
    type: [ProductResponse],
  })
  @Get()
  getProducts(): void {
    return;
  }

  @ApiOkResponse({
    description: '',
    type: ProductResponse,
  })
  @ApiNotFoundResponse({
    description: '',
    type: RequestError,
  })
  @Get(':id')
  getProductById(@Param('id') id: string): void {
    console.log(id);
    return;
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: '',
    type: ProductResponse,
  })
  @ApiBadRequestResponse({
    description: '',
    type: RequestError,
  })
  @ApiUnauthorizedResponse({
    description: '',
    type: RequestError,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  createProduct(@Param() product: CreateProduct): void {
    console.log(product);
    return;
  }
}
