import { useRecoilState } from 'recoil';

import ServiceButton from './shared/ServiceButton';
import cartAtom, { CartProduct } from '../atoms/cart';
import { APIService } from '../atoms/products';

type Props = {
  service: APIService;
};

type OnClickProps = React.MouseEvent<HTMLButtonElement, MouseEvent>;

const Service: React.FC<Props> = ({ service }) => {
  const [cart, setCart] = useRecoilState(cartAtom);

  const serviceInCart = cart.productsIds.find(
    product => product.id === service.id
  );

  function handleAddToCart(event: OnClickProps) {
    event.preventDefault();

    setCart(oldCart => {
      const newProductsIds: CartProduct[] = [];

      // If the service is already in the cart, we just increment the quantity.
      // Otherwise, we add it to the cart with a quantity of 1.
      if (oldCart.productsIds.some(product => product.id === service.id)) {
        newProductsIds.push(
          ...oldCart.productsIds.map(product =>
            product.id === service.id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          )
        );
      } else {
        newProductsIds.push(...oldCart.productsIds, {
          id: service.id,
          categoryId: service.category_id,
          quantity: 1,
        });
      }

      return {
        ...oldCart,
        productsIds: newProductsIds,
      };
    });
  }

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
    <div className="flex justify-between bg-[#222222] rounded-lg shadow-lg p-4 w-full">
      <div className="flex flex-col items-start justify-center">
        <h2 className="text-lg font-extrabold text-white">{service.title}</h2>
        <p className="text-sm text-gray-100 mr-2">{service.description}</p>
      </div>

      <div className="flex flex-col items-end justify-center">
        <p className="text-sm text-yellow-300 font-bold">€ {service.price}</p>

        {!serviceInCart?.quantity && (
          <ServiceButton
            className="from-[#22c55e] to-[#39B34B]"
            onClick={handleAddToCart}
          >
            ADD
          </ServiceButton>
        )}

        {serviceInCart?.quantity && (
          <div className="flex flex-row items-center justify-center">
            <ServiceButton
              className="from-[#EB4949] to-[#D74141]"
              onClick={handleRemoveFromCart}
            >
              -
            </ServiceButton>

            <p className="px-2 py-0.5 text-white font-bold">
              {serviceInCart.quantity}
            </p>

            <ServiceButton
              className="from-[#22c55e] to-[#39B34B]"
              onClick={handleAddToCart}
            >
              +
            </ServiceButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Service;
