import { useRecoilState } from 'recoil';

import cartAtom from '../atoms/cart';
import { APIService } from '../atoms/products';

type Props = {
  service: APIService & {
    isTip?: boolean;
  };
};

type OnClickProps = React.MouseEvent<HTMLButtonElement, MouseEvent>;

const ConfirmationService: React.FC<Props> = ({ service }) => {
  const [cart, setCart] = useRecoilState(cartAtom);

  const serviceInCart = cart.productsIds.find(
    product => product.id === service.id
  );

  function handleRemoveFromCart(event: OnClickProps) {
    event.preventDefault();

    setCart(oldCart => {
      const newProductsIds = oldCart.productsIds
        .map(product =>
          product.id === service.id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter(product => product.quantity > 0);

      return {
        ...oldCart,
        productsIds: newProductsIds,
      };
    });
  }

  return (
    <div className="flex justify-between items-end bg-[#222222] rounded-lg shadow-lg p-4 w-full">
      <div className="flex flex-col items-start justify-center mb-auto">
        <div className="flex flex-row items-end justify-center gap-2">
          <h2 className="text-base font-extrabold text-white">
            {service.title}
          </h2>
        </div>

        <p className="text-sm text-gray-100 mr-2">{service.description}</p>
      </div>

      <div className="flex flex-col items-end mb-auto gap-1">
        <div className="flex flex-row gap-2 items-end w-max text-white font-bold text-sm">
          <p className="text-[#22c55e]">
            {service.isTip ? 'TIP' : `x${serviceInCart?.quantity}`}
          </p>

          <p className="text-white">
            € {(serviceInCart?.quantity || 0) * service.price}
          </p>
        </div>

        <button
          className="px-2 py-0.5 ml-1 rounded bg-gradient-to-r text-sm text-white font-bold hover:cursor-pointer from-[#EB4949] to-[#D74141]"
          onClick={handleRemoveFromCart}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default ConfirmationService;
