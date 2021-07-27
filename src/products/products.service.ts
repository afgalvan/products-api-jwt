import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './domain/product';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getProductById(id: string): Promise<Product | null> {
    return await this.productModel.findById(id);
  }

  async getProducts(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async saveProduct(product: Product): Promise<Product> {
    const model = new this.productModel(product);
    return await model.save();
  }
}
