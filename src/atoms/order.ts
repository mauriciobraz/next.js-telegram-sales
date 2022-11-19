import { atom } from "recoil";

export type Order = {
  txId: string;
  amount: number;
  orderId: string;
};

const orderAtom = atom<Order | null>({
  key: "orderAtom",
  default: null,
});

export default orderAtom;
