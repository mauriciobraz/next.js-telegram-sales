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
    <div className="flex w-full items-end justify-between rounded-lg bg-[#222222] p-4 shadow-lg">
      <div className="mb-auto flex flex-col items-start justify-center">
        <div className="flex flex-row items-end justify-center gap-2">
          <h2 className="text-base font-extrabold text-white">
            {service.title}
          </h2>
        </div>

        <p className="mr-2 text-sm text-gray-100">{service.description}</p>
      </div>

      <div className="mb-auto flex flex-col items-end gap-1">
        <div className="flex w-max flex-row items-end gap-2 text-sm font-bold text-white">
          <p className="text-[#22c55e]">
            {service.isTip ? 'TIP' : `x${serviceInCart?.quantity}`}
          </p>

          <p className="text-white">
            € {(serviceInCart?.quantity || 0) * service.price}
          </p>
        </div>

        <button
          className="ml-1 rounded bg-gradient-to-r from-[#EB4949] to-[#D74141] px-2 py-0.5 text-sm font-bold text-white hover:cursor-pointer"
          onClick={handleRemoveFromCart}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default ConfirmationService;
