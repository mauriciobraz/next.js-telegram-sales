import Modal from 'react-modal';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import ConfirmationService from '../../components/ConfirmationService';

import ArrowBackSvg from '../../assets/ArrowBackSvg';

import cartAtom from '../../atoms/cart';
import cartDetailsSelector from '../../selectors/cart-details';
import cartWithProductsSelector from '../../selectors/cart-products';
import type { APIService } from '../../atoms/products';

const modalStyles: Modal.Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#242424',
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
  },
};

const Cart: NextPage = () => {
  const router = useRouter();

  const setCart = useSetRecoilState(cartAtom);
  const cartDetails = useRecoilValue(cartDetailsSelector);
  const cartWithProducts = useRecoilValue(cartWithProductsSelector);

  const [showTipsModal, setShowTipsModal] = useState(false);

  useEffect(() => {
    if (!window.Telegram.WebApp.isExpanded) {
      window.Telegram.WebApp.expand();
    }

    // @ts-expect-error
    window.Telegram.WebApp.enableClosingConfirmation();

    window.Telegram.WebApp.MainButton.color = '#22c55e';
    window.Telegram.WebApp.MainButton.text = `Checkout (€ ${cartDetails.total})`;

    window.Telegram.WebApp.MainButton.isActive = true;
    window.Telegram.WebApp.MainButton.isVisible = true;

    window.Telegram.WebApp.onEvent('mainButtonClicked', () => {
      router.push('/checkout');
    });
  }, [cartDetails.total, router]);

  function handleAddTip(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setCart(oldCart => ({
      ...oldCart,
      tipsAmount: oldCart.tipsAmount + parseInt(e.currentTarget.value, 10),
    }));
  }

  function createToggleModal(value: boolean) {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setShowTipsModal(value);
    };
  }

  const handleOpenModal = createToggleModal(true);
  const handleCloseModal = createToggleModal(false);

  return (
    <div className="flex flex-col items-center min-h-screen py-6 bg-[#161616]">
      <header className="flex flex-row items-center">
        <ArrowBackSvg
          className="w-8 h-8 left-6 absolute hover:cursor-pointer focus:outline-none"
          colors={['#22c55e', '#39B34B']}
          onClick={() => router.back()}
        />

        <h1 className="pb-2 text-2xl font-bold text-white text-center">
          Confirm Order
        </h1>
      </header>

      <main className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mt-4 px-6 mb-28 scroll-smooth">
        {cartWithProducts.products.map(product => (
          <ConfirmationService
            key={product.id}
            service={product as APIService}
          />
        ))}

        <div className="fixed flex flex-col place-content-end inset-0 mt-auto px-4 py-4 space-y-4 h-40 bg-gradient-to-t from-[#161616] via-[#161616]">
          <h1 className="mx-1 select-none text-base font-bold text-white">
            Grand Total{' '}
            <span className="float-right">€ {cartDetails.total}</span>
          </h1>

          <button
            className="w-full py-2 px-4 rounded font-bold text-white bg-[#22c55e] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleOpenModal}
            disabled
          >
            Add a Tip!
          </button>
        </div>

        {/* TODO: Implement tip system. */}

        {/* <Modal
          style={modalStyles}
          isOpen={showTipsModal}
          contentLabel="Add a Tip"
          onRequestClose={handleCloseModal}
        >
          <h2 className="font-bold text-white mb-2.5">
            Select a Tip Amount (€ {cartDetails.tipsAmount})
          </h2>

          <div className="flex flex-row space-x-2">
            {[1, 2, 5, 10].map((tip, index) => (
              <button
                key={index}
                value={tip}
                className="h-full py-2 px-4 rounded font-bold text-white bg-[#22c55e]"
                onClick={handleAddTip}
              >
                € {tip}
              </button>
            ))}
          </div>
        </Modal> */}
      </main>
    </div>
  );
};

export default Cart;
