import Image from 'next/image';

import ServiceButton from './shared/ServiceButton';
import { APIProduct } from '../atoms/products';

type Props = {
  product: APIProduct;
  onClick: () => void;
};

const Product: React.FC<Props> = ({ product, onClick }) => {
  return (
    <div
      className="flex w-full flex-row items-center gap-4 rounded-lg bg-[#222222] p-4 shadow-lg hover:cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={`/images/${product.id}.png`}
        alt={product.id}
        width={44}
        height={44}
      />

      <div className="flex flex-col items-start justify-center">
        <h2 className="text-lg font-extrabold text-white">{product.title}</h2>
        <p className="text-sm font-medium text-gray-100">
          {product.description}
        </p>
      </div>

      <ServiceButton className="ml-auto from-[#22c55e] to-[#39B34B] py-1">
        CHOOSE
      </ServiceButton>
    </div>
  );
};

export default Product;
