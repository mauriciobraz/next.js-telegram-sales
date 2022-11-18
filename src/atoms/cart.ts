import { atom } from 'recoil';

export type CartProduct = {
  id: number;
  categoryId: string;
  quantity: number;
};

export type Cart = {
  tipsAmount: number;
  productsIds: CartProduct[];
  paymentMethod?: string;
};

const cartAtom = atom<Cart>({
  key: 'cartAtom',
  default: {
    tipsAmount: 0,
    productsIds: [],
  },
});

export default cartAtom;
