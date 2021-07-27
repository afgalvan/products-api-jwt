import { productStub } from '../test/stubs/product.stub';

export const ProductsService = jest.fn().mockReturnValue({
  getProductById: jest.fn().mockResolvedValue(productStub()),
  getProducts: jest.fn().mockResolvedValue([productStub()]),
  saveProduct: jest.fn().mockResolvedValue(productStub()),
  // updateProduct: jest.fn().mockResolvedValue(productStub()),
});
