import { atom } from 'recoil';

export type APIProduct = {
  id: string;

  category_id: string;
  category_name: string;

  title: string;
  description: string;

  rating: string;
  services: APIService[];
};

export type APIService = {
  id: number;
  category_id: string;
  category_name: string;

  title: string;
  description: string;

  price: number;
  quantity: number;
  is_active: boolean;
};

const productsAtom = atom<APIProduct[] | null>({
  key: 'productsAtom',
  default: null,
});

export default productsAtom;
