import { FlatList } from "react-native";

import CreditCardItem from "./CreditCardItem";
import type { CreditCard } from "./types";

type Props = {
  cards: CreditCard[];
};

export default function CreditCardList({ cards }: Props) {
  return (
    <FlatList
      data={cards}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CreditCardItem card={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 32,
      }}
    />
  );
}
// import { FlatList } from "react-native";

// import CreditCardItem from "./CreditCardItem";
// import { creditCards } from "./data";

// export default function CreditCardList() {
//   return (
//     <FlatList
//       data={creditCards}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => <CreditCardItem card={item} />}

//       contentContainerStyle={{
//         paddingBottom: 24,
//       }}
//       showsVerticalScrollIndicator={false}
//     />
//   );
// }
