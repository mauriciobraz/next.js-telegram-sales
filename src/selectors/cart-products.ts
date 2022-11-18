import { selector } from 'recoil';

import cartAtom from '../atoms/cart';
import productsAtom from '../atoms/products';

const cartWithProductsSelector = selector({
  key: 'cartWithProductsSelector',
  get: ({ get }) => {
    const cart = get(cartAtom);
    const products = get(productsAtom);

    const cartWithProducts = cart.productsIds.map(cartProduct => {
      const prods = products
        ?.find(product => product.category_id === cartProduct.categoryId)
        ?.services.find(service => service.id === cartProduct.id);

      return {
        ...prods,
        quantity: cartProduct.quantity,
      };
    });

    return {
      products: cartWithProducts,
    };
  },
});

export default cartWithProductsSelector;
