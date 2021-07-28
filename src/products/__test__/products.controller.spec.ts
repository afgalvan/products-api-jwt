import { Test, TestingModule } from '@nestjs/testing';

import { CreateProduct } from '../dto/product.request';
import { ProductResponse } from '../dto/product.response';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';
import { productStub } from './stubs/product.stub';

jest.mock('../products.service');

describe('ProductsController', () => {
  let productController: ProductsController;
  let productService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
      controllers: [ProductsController],
    }).compile();

    productController = module.get<ProductsController>(ProductsController);
    productService = module.get<ProductsService>(ProductsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
    expect(productService).toBeDefined();
  });

  describe('createProduct', () => {
    describe('when createProduct is called', () => {
      let createProduct: CreateProduct;
      let productResponse: ProductResponse;

      beforeEach(async () => {
        createProduct = productStub();
        productResponse = await productController.createProduct(createProduct);
      });

      it('should call ProductsService', () => {
        expect(productService.saveProduct).toHaveBeenCalledWith(createProduct);
      });

      it('should return a product', () => {
        expect(productResponse).toEqual(productStub());
      });
    });
  });

  describe('getProducts', () => {
    describe('when getProducts is called', () => {
      let productResponse: ProductResponse[];

      beforeEach(async () => {
        productResponse = await productController.getProducts();
      });

      it('should call ProductsService', () => {
        expect(productService.getProducts).toHaveBeenCalled();
      });

      it('should return a product', () => {
        expect(productResponse).toEqual([productStub()]);
      });
    });
  });

  describe('getProductById', () => {
    describe('when getProductById is called', () => {
      let productId: string;
      let productResponse: ProductResponse;

      beforeEach(async () => {
        productId = productStub()._id || '';
        productResponse = await productController.getProductById(productId);
      });

      it('should call ProductsService', () => {
        expect(productService.getProductById).toHaveBeenCalledWith(productId);
      });

      it('should return a product with the matched id', () => {
        expect(productResponse).toEqual(productStub());
      });
    });
  });
});
