import { View } from "react-native";
import CreditCardList from "./CreditCardList";
import CreditCardsHeader from "./CreditCardsHeader";
import { useCreditCards } from "./hooks";

export default function CreditCardsOverview() {
  const { cards, totalOutstanding, currentCycleSpend, activeCards, billsDue } =
    useCreditCards();

  return (
    <View className="flex-1">
      <CreditCardsHeader
        totalOutstanding={totalOutstanding}
        currentCycleSpend={currentCycleSpend}
        activeCards={activeCards}
        billsDue={billsDue}
      />

      <CreditCardList cards={cards} />
    </View>
  );
}
