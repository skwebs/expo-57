import { FlatList, View } from "react-native";

import Header from "./Header";
import RecentTransactionRow from "./RecentTransactionRow";
import { recentTransactions } from "./data";

type RecentTransactionsProps = {
  header?: React.ReactNode;
};

export default function RecentTransactions({
  header,
}: RecentTransactionsProps) {
  return (
    <FlatList
      data={recentTransactions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RecentTransactionRow item={item} />}
      ListHeaderComponent={
        <>
          {header}
          <Header />
        </>
      }
      ItemSeparatorComponent={() => (
        <View className="h-px bg-slate-200 dark:bg-slate-700" />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 32,
      }}
    />
  );
}

// import { FlatList, View } from "react-native";

// import Header from "./Header";
// import RecentTransactionRow from "./RecentTransactionRow";
// import { recentTransactions } from "./data";

// export default function RecentTransactions() {
//   return (
//     <FlatList
//       data={recentTransactions}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => <RecentTransactionRow item={item} />}
//       ListHeaderComponent={<Header />}
//       ItemSeparatorComponent={() => <View className="h-px bg-slate-200" />}
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{
//         paddingHorizontal: 16,
//         paddingBottom: 32,
//       }}
//     />
//   );
// }
