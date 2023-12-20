import httpClient from ".";
import { routes } from "./routes";

const topUp = (idCustomer: number, coin: number) => {
  return httpClient.post(routes.payment.topUp, { idCustomer, amount: coin });
};

const getTransaction = (idCustomer: number) => {
  return httpClient.get(
    `${routes.payment.transactionHistory}?isCustomer=${idCustomer}`
  );
};

export { topUp, getTransaction };
