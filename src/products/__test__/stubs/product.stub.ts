import { Product } from '../../domain/product';

export const productStub = (): Product => ({
  _id: 'd123',
  name: 'Nike Air Zoom Vomero 15',
  description: `Your trusted favourite returns.
  The Nike Air Zoom Vomero 15 is back with updated
  cushioning and a tough outsole for traction. Its look
  is inspired by the Vomero 5, combining a classic design
  with the innovation you want for a durable shoe.`,
  imageUrl: new URL(
    'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/9095d410-7e74-40cc-8181-92e8bc413b7b/air-zoom-vomero-15-running-shoe-wqDgSG.png',
  ),
  price: 260,
});
