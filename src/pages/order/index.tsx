import Image from "next/image";
import { NextPage } from "next";

import { MouseEventHandler } from "react";
import { FiCopy } from "react-icons/fi";

import dedent from "ts-dedent";
import { useRecoilState } from "recoil";

import Toast from "../../components/Toast";
import orderAtom from "../../atoms/order";
import useWindowSize from "../../hooks/useWindowSize";
import TrianglesListSvg from "../../assets/TrianglesList";

const OrderDetails: NextPage = () => {
  const { height, width } = useWindowSize();
  const [order] = useRecoilState(orderAtom);

  const handleCopyDetails: MouseEventHandler<HTMLSpanElement> = (event) => {
    if (!order) return;

    navigator.clipboard.writeText(dedent`
    💵 Amount: ${order.amount}
    🪪 Order ID: ${order.orderId}
    💳 Transaction ID: ${order.txId}
  `);

    Toast.notify({
      duration: 5000,
      message: "Your order details have been copied to your clipboard!",
    });
  };

  if (!order) {
    return (
      <div className="grid h-screen place-items-center bg-[#161616] px-6">
        <h1 className="text-center text-2xl font-bold text-white">
          Order not found. If you think this is a mistake, please contact us.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen select-none flex-col bg-[#161616]">
      <div className="flex grow flex-col items-center justify-center">
        <h1 className="text-center text-4xl font-bold text-white tg:text-3xl">
          Order Generated Success
        </h1>

        <div className="flex flex-col items-center gap-4 rounded-md py-8">
          <Image
            src="/images/success.png"
            alt="Success"
            // If it's smaller than that, we'll increase the size of the image
            // in 60% of the width of the screen to make it look better.
            // NOTE: 560px is the width of the webview on desktop.
            width={width && width < 560 ? width * 0.6 : 194}
            height={height && height < 560 ? height * 0.6 : 194}
          />

          <h2
            className="
              bg-gradient-to-r from-[#39B34B] to-[#5bcf6c] bg-clip-text text-2xl
              font-extrabold text-transparent
            "
          >
            Successfully Generated
          </h2>

          <span
            className="
              cursor-pointer rounded-md border-2 border-white/10 bg-gradient-to-r
              from-gray-200 to-white bg-clip-text px-4 py-2 text-sm
              font-extrabold uppercase text-transparent
            "
            onClick={handleCopyDetails}
          >
            Copy Order Details
          </span>
        </div>
      </div>

      {/* Bottom card w/ all the order details */}
      <div className="mt-auto h-full w-full">
        <TrianglesListSvg
          className="-mb-2 h-auto w-full rounded-md"
          color="#2e2e2e"
        />

        <div className="flex flex-col gap-4 rounded-md bg-white/10 p-8">
          {Object.entries({
            Amount: `€ ${order.amount}`,
            "Order ID": order.orderId,
            "TX Address": order.txId,
          }).map(([key, value]) => (
            <div
              key={key}
              className="flex w-full flex-row items-center justify-between"
            >
              <h3
                className="
                  bg-gradient-to-r from-[#39B34B] to-[#5bcf6c]
                  bg-clip-text font-extrabold text-transparent
                "
              >
                {key}
              </h3>

              <div className="flex flex-row items-center">
                <p className="w-52 truncate text-end text-sm font-bold text-white tg:w-auto">
                  {value}
                </p>

                <FiCopy
                  className="ml-2 cursor-pointer text-white"
                  onClick={() => {
                    navigator.clipboard.writeText(value.toString());

                    Toast.notify({
                      duration: 5000,
                      message: `${key} has been copied to your clipboard!`,
                    });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
