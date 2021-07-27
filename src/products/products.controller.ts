import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
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
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

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
  async createProduct(
    @Body() product: CreateProduct,
  ): Promise<ProductResponse> {
    if (!product.name || !product.imageUrl) {
      throw new BadRequestException(
        'Request does not have all the required fields',
      );
    }
    if (!product.price) {
      throw new BadRequestException('The price should not be more than 0');
    }

    return this.productService.saveProduct(product);
  }
}
