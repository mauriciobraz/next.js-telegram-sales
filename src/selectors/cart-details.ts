import { selector } from 'recoil';

import cartAtom from '../atoms/cart';
import cartWithProductsSelector from './cart-products';

const cartDetailsSelector = selector({
  key: 'cartDetailsSelector',
  get: ({ get }) => {
    const cart = get(cartAtom);
    const { products } = get(cartWithProductsSelector);

    const productsTotal = products.reduce((acc, product) => {
      return acc + (product.price || 0) * product.quantity;
    }, cart.tipsAmount);

    return {
      total: productsTotal || 0,
      tipsAmount: cart.tipsAmount,
    };
  },
});

export default cartDetailsSelector;
