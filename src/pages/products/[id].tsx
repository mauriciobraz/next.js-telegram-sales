import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import ArrowBackSvg from "../../assets/ArrowBackSvg";
import orderAtom from "../../atoms/order";
import productsAtom from "../../atoms/products";
import Service from "../../components/Service";
import API from "../../constants/api";
import cartDetailsSelector from "../../selectors/cart-details";
import useTelegramInitData from "../../hooks/useTelegramInitData";

const Products: NextPage = () => {
  const router = useRouter();
  const initData = useTelegramInitData();

  const cartDetails = useRecoilValue(cartDetailsSelector);
  const [products] = useRecoilState(productsAtom);
  const [, setOrder] = useRecoilState(orderAtom);

  const product = products?.find((product) => product.id === router.query.id);

  useEffect(() => {
    if (!window.Telegram.WebApp.isExpanded) {
      window.Telegram.WebApp.expand();
    }

    window.Telegram.WebApp.MainButton.color = "#22c55e";
    window.Telegram.WebApp.MainButton.text =
      cartDetails.total > 0
        ? `Checkout (€ ${cartDetails.total})`
        : "Choose any product to checkout";

    window.Telegram.WebApp.MainButton.isVisible = true;
    window.Telegram.WebApp.MainButton.isActive = cartDetails.total > 0;

    window.Telegram.WebApp.onEvent("mainButtonClicked", () => {
      // TODO: Test this (API is down right now).
      API.post(process.env.API_ENDPOINT_POST_ORDER + "/order", {
        user_id: initData.user?.id,
        web_query_id: initData.query_id,
        products: products,
      })
        .then((response) => {
          setOrder({
            orderId: response.data["order_id"] ?? "<ORDER_ID>",
            amount: cartDetails.total,
            txId: response.data["address"] ?? "<ADDRESS>",
          });

          router.push("/cart");
        })
        .catch((_error) => {
          router.push("/error");
        });
    });
  }, [cartDetails.total, router, setOrder]);

  if (!product) {
    return (
      <div className="grid h-screen place-items-center px-4">
        <h1 className="text-center text-2xl font-bold">
          Product not found, make sure you have the correct link.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#161616] py-6">
      <header className="flex flex-row items-center">
        <ArrowBackSvg
          className="absolute left-6 h-8 w-8 hover:cursor-pointer focus:outline-none"
          colors={["#22c55e", "#39B34B"]}
          onClick={() => router.back()}
        />

        <h1 className="pb-2 text-center text-2xl font-bold text-white">
          {product.title}
        </h1>
      </header>

      <main className="mt-4 grid w-full max-w-6xl grid-cols-1 gap-4 px-6 md:grid-cols-2 lg:grid-cols-3">
        {product.services.map((service) => (
          <Service key={service.id} service={service} />
        ))}
      </main>
    </div>
  );
};

export default Products;
