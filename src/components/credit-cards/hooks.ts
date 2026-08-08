import { creditCards } from "./data";

export function useCreditCards() {
  const totalOutstanding = creditCards.reduce(
    (sum, card) => sum + card.remainingDueAmount,
    0,
  );

  const currentCycleSpend = creditCards.reduce(
    (sum, card) => sum + card.currentCycleSpend,
    0,
  );

  const activeCards = creditCards.length;

  const billsDue = creditCards.filter(
    (card) => card.paymentStatus !== "paid",
  ).length;

  return {
    cards: creditCards,
    totalOutstanding,
    currentCycleSpend,
    activeCards,
    billsDue,
  };
}
