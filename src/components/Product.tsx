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
      className="flex flex-row items-center bg-[#222222] rounded-lg shadow-lg p-4 w-full gap-4 hover:cursor-pointer"
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
        <p className="text-sm text-gray-100 font-medium">
          {product.description}
        </p>
      </div>

      <ServiceButton className="ml-auto py-1 from-[#22c55e] to-[#39B34B]">
        CHOOSE
      </ServiceButton>
    </div>
  );
};

export default Product;
