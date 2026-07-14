import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Image } from "expo-image";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type BalanceType = "asset" | "liability" | "receivable";

type TransactionType = "expense" | "income" | "transfer";

/* -------------------------------------------------------------------------- */
/*                                  Mock Data                                 */
/* -------------------------------------------------------------------------- */

const usedBudget = 2_012;
const totalBudget = 20_000;

const accountItems = [
  {
    id: "credit-cards",
    name: "Credit Cards",
    amount: 20_000.21,
    balanceType: "liability",
    icon: "card-outline",
  },
  {
    id: "banks",
    name: "Banks",
    amount: 20_000,
    balanceType: "asset",
    icon: "business-outline",
  },
  {
    id: "cash",
    name: "Cash",
    amount: 20_000,
    balanceType: "asset",
    icon: "cash-outline",
  },
  {
    id: "payable",
    name: "Payable",
    amount: 20_000,
    balanceType: "liability",
    icon: "arrow-up-circle-outline",
  },
  {
    id: "receivable",
    name: "Receivable",
    amount: 20_000,
    balanceType: "receivable",
    icon: "arrow-down-circle-outline",
  },
] as const;

const recentTransactions = [
  {
    id: "1",
    title: "Indian Oil",
    subtitle: "Fuel",
    accountName: "HDFC Credit Card",
    amount: 2_500,
    type: "expense",
    date: new Date("2026-07-14T10:32:00"),
    icon: "car-outline",
  },
  {
    id: "2",
    title: "Salary",
    subtitle: "Income",
    accountName: "SBI Bank",
    amount: 13_000,
    type: "income",
    date: new Date("2026-07-13T09:15:00"),
    icon: "wallet-outline",
  },
  {
    id: "3",
    title: "Amazon",
    subtitle: "Shopping",
    accountName: "ICICI Credit Card",
    amount: 1_899,
    type: "expense",
    date: new Date("2026-07-12T18:45:00"),
    icon: "bag-handle-outline",
  },
  {
    id: "4",
    title: "Credit Card Payment",
    subtitle: "Card Payment",
    accountName: "SBI Bank",
    amount: 5_000,
    type: "transfer",
    date: new Date("2026-07-11T14:20:00"),
    icon: "swap-horizontal-outline",
  },
  {
    id: "5",
    title: "Cashback",
    subtitle: "Reward",
    accountName: "HDFC Credit Card",
    amount: 250,
    type: "income",
    date: new Date("2026-07-10T12:10:00"),
    icon: "gift-outline",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                                Derived Types                               */
/* -------------------------------------------------------------------------- */

type AccountItem = (typeof accountItems)[number];

type RecentTransaction = (typeof recentTransactions)[number];

/* -------------------------------------------------------------------------- */
/*                                  Utilities                                 */
/* -------------------------------------------------------------------------- */

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  }).format(amount);

function formatTransactionDate(date: Date) {
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const time = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

  if (isToday) {
    return `Today, ${time}`;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */

function Header() {
  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <View className="w-full flex-row items-center justify-between">
      <View>
        <Text className="text-lg font-bold text-gray-900">{formattedDate}</Text>

        <Text className="text-sm text-gray-500">Welcome back, Satish!</Text>
      </View>

      <View className="overflow-hidden rounded-full bg-gray-200 p-1">
        <Image
          source={require("@/assets/images/person.png")}
          contentFit="cover"
          style={{
            width: 36,
            height: 36,
          }}
          transition={200}
        />
      </View>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Expense Card                                */
/* -------------------------------------------------------------------------- */

function ExpenseCard() {
  const remainingBudget = Math.max(totalBudget - usedBudget, 0);

  const rawUsedPercent = totalBudget > 0 ? (usedBudget / totalBudget) * 100 : 0;

  const progressPercent = Math.min(Math.max(rawUsedPercent, 0), 100);

  return (
    <View className="mt-4 w-full rounded-2xl border border-gray-200 bg-white p-3">
      {/* Header */}
      <View className="flex-row items-center justify-between gap-4">
        <Text className="text-sm font-bold uppercase text-gray-900">
          Remaining Budget
        </Text>

        <Text className="text-sm text-gray-500">
          Expense: ₹{formatAmount(usedBudget)}
        </Text>
      </View>

      {/* Primary Amount */}
      <View className="w-full flex-row items-end">
        <View className="flex-row items-baseline">
          <Text className="mr-1 text-3xl font-semibold text-gray-400">₹</Text>

          <Text className="text-5xl font-bold tracking-tight text-gray-900">
            {formatAmount(remainingBudget)}
          </Text>

          <Text className="text-2xl font-bold text-gray-400">.00</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="my-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <View
          className="h-full rounded-full bg-gray-600"
          style={{
            width: `${progressPercent}%`,
          }}
        />
      </View>

      {/* Details */}
      <View className="flex-row items-center justify-between gap-4">
        <Text className="text-sm text-gray-500">
          ₹{formatAmount(usedBudget)} of ₹{formatAmount(totalBudget)} used
        </Text>

        <Text className="text-sm font-medium text-gray-500">
          {rawUsedPercent.toFixed(1)}%
        </Text>
      </View>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Account Row                                */
/* -------------------------------------------------------------------------- */

type AccountRowProps = {
  item: AccountItem;
  isLast: boolean;
};

function AccountRow({ item, isLast }: AccountRowProps) {
  const isLiability = item.balanceType === "liability";
  const isReceivable = item.balanceType === "receivable";

  const iconColor = isLiability
    ? "#ef4444"
    : isReceivable
      ? "#16a34a"
      : "#4b5563";

  const iconBackground = isLiability
    ? "bg-red-50"
    : isReceivable
      ? "bg-green-50"
      : "bg-gray-100";

  const amountColor = isLiability
    ? "text-red-500"
    : isReceivable
      ? "text-green-600"
      : "text-gray-900";

  return (
    <Pressable
      className={`w-full flex-row items-center justify-between px-4 py-3 ${
        isLast ? "" : "border-b border-gray-200"
      }`}
      onPress={() => {}}
      android_ripple={{
        color: "#d1d5db",
        alpha: 0.15,
      }}
    >
      {/* Left */}
      <View className="flex-row items-center">
        <View
          className={`size-10 items-center justify-center rounded-full ${iconBackground}`}
        >
          <Ionicons name={item.icon} size={20} color={iconColor} />
        </View>

        <Text className="ml-3 font-bold uppercase text-gray-600">
          {item.name}
        </Text>
      </View>

      {/* Right */}
      <View className="flex-row items-center gap-2">
        <Text className={`font-bold ${amountColor}`}>
          ₹{formatAmount(item.amount)}
        </Text>

        <Ionicons name="chevron-forward" size={20} color="#6b7280" />
      </View>
    </Pressable>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Account List                                */
/* -------------------------------------------------------------------------- */

function AccountList() {
  return (
    <View className="overflow-hidden rounded-2xl border border-gray-200">
      {accountItems.map((item, index) => (
        <AccountRow
          key={item.id}
          item={item}
          isLast={index === accountItems.length - 1}
        />
      ))}
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Recent Transaction Row                            */
/* -------------------------------------------------------------------------- */

type RecentTransactionRowProps = {
  item: RecentTransaction;
};

function RecentTransactionRow({ item }: RecentTransactionRowProps) {
  const isExpense = item.type === "expense";
  const isIncome = item.type === "income";

  const amountPrefix = isExpense ? "−" : isIncome ? "+" : "";

  const amountColor = isExpense
    ? "text-red-500"
    : isIncome
      ? "text-green-600"
      : "text-gray-900";

  const iconBackground = isExpense
    ? "bg-red-50"
    : isIncome
      ? "bg-green-50"
      : "bg-gray-100";

  const iconColor = isExpense ? "#ef4444" : isIncome ? "#16a34a" : "#4b5563";

  return (
    <Pressable
      className="flex-row items-center py-3"
      onPress={() => {}}
      android_ripple={{
        color: "#e5e7eb",
        alpha: 0.3,
      }}
    >
      {/* Icon */}
      <View
        className={`size-11 items-center justify-center rounded-full ${iconBackground}`}
      >
        <Ionicons name={item.icon} size={21} color={iconColor} />
      </View>

      {/* Details */}
      <View className="ml-3 flex-1">
        <Text
          className="text-base font-semibold text-gray-900"
          numberOfLines={1}
        >
          {item.title}
        </Text>

        <Text className="mt-0.5 text-xs text-gray-500" numberOfLines={1}>
          {item.subtitle} · {item.accountName}
        </Text>
      </View>

      {/* Amount and Date */}
      <View className="ml-3 items-end">
        <Text className={`text-base font-bold ${amountColor}`}>
          {amountPrefix}₹{formatAmount(item.amount)}
        </Text>

        <Text className="mt-0.5 text-xs text-gray-400">
          {formatTransactionDate(item.date)}
        </Text>
      </View>
    </Pressable>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Recent Transactions                             */
/* -------------------------------------------------------------------------- */

function RecentTransactions() {
  return (
    <View className="flex-1 px-4">
      {/* Fixed Header */}
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-gray-900">
          Recent Transactions
        </Text>

        <Pressable onPress={() => {}} hitSlop={8}>
          <Text className="text-sm font-semibold text-gray-500">View all</Text>
        </Pressable>
      </View>

      {/* Scrollable List */}
      <FlatList
        data={recentTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecentTransactionRow item={item} />}
        ItemSeparatorComponent={() => <View className="h-px bg-gray-100" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 24,
        }}
      />
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Dashboard Screen                              */
/* -------------------------------------------------------------------------- */

export default function DashboardScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {/* Header + Budget */}
      <View className="px-4 pt-4">
        <Header />
        <ExpenseCard />
      </View>

      {/* Accounts */}
      <View className="p-4">
        <AccountList />
      </View>

      {/* Recent Transactions */}
      <RecentTransactions />
    </SafeAreaView>
  );
}
// import { Ionicons } from "@react-native-vector-icons/ionicons";
// import { Image } from "expo-image";
// import { FlatList, Pressable, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const usedBudget = 2012;
// const totalBudget = 20000;

// // const accountItems = [
// //   { id: "credit-cards", name: "Credit Cards", amount: 20000.21, payable: true },
// //   { id: "banks", name: "Banks", amount: 20000, payable: false },
// //   { id: "cash", name: "Cash", amount: 20000, payable: false },
// //   { id: "payable", name: "Payable", amount: 20000, payable: true },
// //   { id: "receivable", name: "Receivable", amount: 20000, payable: false },
// // ] as const;
// const accountItems = [
//   {
//     id: "credit-cards",
//     name: "Credit Cards",
//     amount: 20000.21,
//     payable: true,
//     icon: "card-outline",
//   },
//   {
//     id: "banks",
//     name: "Banks",
//     amount: 20000,
//     payable: false,
//     icon: "business-outline",
//   },
//   {
//     id: "cash",
//     name: "Cash",
//     amount: 20000,
//     payable: false,
//     icon: "cash-outline",
//   },
//   {
//     id: "payable",
//     name: "Payable",
//     amount: 20000,
//     payable: true,
//     icon: "arrow-up-circle-outline",
//   },
//   {
//     id: "receivable",
//     name: "Receivable",
//     amount: 20000,
//     payable: false,
//     icon: "arrow-down-circle-outline",
//   },
// ] as const;

// const formatAmount = (amount: number) =>
//   new Intl.NumberFormat("en-IN", {
//     maximumFractionDigits: 2,
//   }).format(amount);

// function Header() {
//   const formattedDate = new Intl.DateTimeFormat("en-IN", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   }).format(new Date());

//   return (
//     <View className="w-full flex-row items-center justify-between">
//       <View>
//         <Text className="text-lg font-bold text-gray-900">{formattedDate}</Text>
//         <Text className="text-sm text-gray-500">Welcome back, Satish!</Text>
//       </View>

//       <View className="overflow-hidden rounded-full bg-gray-200 p-1">
//         <Image
//           source={require("@/assets/images/person.png")}
//           contentFit="cover"
//           style={{ width: 36, height: 36 }}
//           transition={200}
//         />
//       </View>
//     </View>
//   );
// }

// function ExpenseCard() {
//   const rawUsedPercent = totalBudget > 0 ? (usedBudget / totalBudget) * 100 : 0;
//   const progressPercent = Math.min(Math.max(rawUsedPercent, 0), 100);

//   return (
//     <View className="mt-4 w-full rounded-2xl border border-gray-200 bg-white p-3">
//       {/* Header */}
//       <View className="flex-row items-center justify-between gap-4">
//         <Text className="text-sm font-bold uppercase text-gray-900">
//           Monthly Budget
//         </Text>
//         <Text className="text-sm text-gray-500">
//           Total Expense: ₹{formatAmount(usedBudget)}
//         </Text>
//       </View>

//       {/* Total Budget */}
//       <View className="w-full flex-row items-end">
//         <View className="flex-row items-baseline">
//           <Text className="mr-1 text-5xl font-bold text-gray-400">₹</Text>

//           <Text className="text-5xl font-bold text-gray-900">
//             {formatAmount(totalBudget)}
//           </Text>

//           <Text className="text-2xl font-bold text-gray-400">.00</Text>
//         </View>
//       </View>

//       {/* Progress */}
//       <View className="my-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
//         <View
//           className="h-full rounded-full bg-gray-600"
//           style={{
//             width: `${progressPercent}%`,
//           }}
//         />
//       </View>

//       {/* Details */}
//       <View className="flex-row items-center justify-between gap-4">
//         <Text className="text-sm text-gray-500">
//           ₹{formatAmount(usedBudget)} used
//         </Text>

//         <Text className="text-sm text-gray-500">
//           {rawUsedPercent.toFixed(1)}% used
//         </Text>
//       </View>
//     </View>
//   );
// }

// type AccountItem = (typeof accountItems)[number];

// type AccountRowProps = {
//   item: AccountItem;
//   isLast: boolean;
// };

// // function AccountRow({ item, isLast }: AccountRowProps) {
// //   return (
// //     <Pressable
// //       className={`w-full flex-row items-center justify-between px-5 py-4 ${
// //         isLast ? "" : "border-b border-gray-200"
// //       }`}
// //       onPress={() => {}}
// //       android_ripple={{
// //         color: item.payable ? "#f00" : "#0f0",
// //         alpha: 0.1,
// //       }}
// //     >
// //       <Text className="font-bold uppercase text-gray-600">{item.name}</Text>

// //       <View className="flex-row items-center gap-2">
// //         <Text
// //           className={`font-bold ${item.payable ? "text-red-500" : "text-green-500"} text-gray-600`}
// //         >
// //           ₹{formatAmount(item.amount)}
// //         </Text>

// //         <Ionicons name="chevron-forward" size={20} color="#6b7280" />
// //       </View>
// //     </Pressable>
// //   );
// // }

// function AccountRow({ item, isLast }: AccountRowProps) {
//   const iconColor = item.payable ? "#ef4444" : "#16a34a";

//   const iconBackground = item.payable ? "bg-red-50" : "bg-green-50";

//   return (
//     <Pressable
//       className={`w-full flex-row items-center justify-between px-4 py-3 ${
//         isLast ? "" : "border-b border-gray-200"
//       }`}
//       onPress={() => {}}
//       android_ripple={{
//         color: item.payable ? "#ef4444" : "#16a34a",
//         alpha: 0.1,
//       }}
//     >
//       {/* Left: Icon + Account Name */}
//       <View className="flex-row items-center">
//         <View
//           className={`size-10 items-center justify-center rounded-full ${iconBackground}`}
//         >
//           <Ionicons name={item.icon} size={20} color={iconColor} />
//         </View>

//         <Text className="ml-3 font-bold uppercase text-gray-600">
//           {item.name}
//         </Text>
//       </View>

//       {/* Right: Amount + Chevron */}
//       <View className="flex-row items-center gap-2">
//         <Text
//           className={`font-bold ${
//             item.payable ? "text-red-500" : "text-green-600"
//           }`}
//         >
//           ₹{formatAmount(item.amount)}
//         </Text>

//         <Ionicons name="chevron-forward" size={20} color="#6b7280" />
//       </View>
//     </Pressable>
//   );
// }

// function AccountList() {
//   return (
//     <View className="mt-2 border border-gray-200 rounded-2xl overflow-hidden">
//       {accountItems.map((item, index) => (
//         <AccountRow
//           key={item.id}
//           item={item}
//           isLast={index === accountItems.length - 1}
//         />
//       ))}
//     </View>
//   );
// }

// const recentTransactions = [
//   {
//     id: "1",
//     title: "Indian Oil",
//     subtitle: "Fuel",
//     accountName: "HDFC Credit Card",
//     amount: 2500,
//     type: "expense",
//     date: new Date("2026-07-14T10:32:00"),
//     icon: "car-outline",
//   },
//   {
//     id: "2",
//     title: "Salary",
//     subtitle: "Income",
//     accountName: "SBI Bank",
//     amount: 13000,
//     type: "income",
//     date: new Date("2026-07-13T09:15:00"),
//     icon: "wallet-outline",
//   },
//   {
//     id: "3",
//     title: "Amazon",
//     subtitle: "Shopping",
//     accountName: "ICICI Credit Card",
//     amount: 1899,
//     type: "expense",
//     date: new Date("2026-07-12T18:45:00"),
//     icon: "bag-handle-outline",
//   },
//   {
//     id: "4",
//     title: "Credit Card Payment",
//     subtitle: "Card Payment",
//     accountName: "SBI Bank",
//     amount: 5000,
//     type: "transfer",
//     date: new Date("2026-07-11T14:20:00"),
//     icon: "swap-horizontal-outline",
//   },
//   {
//     id: "5",
//     title: "Cashback",
//     subtitle: "Reward",
//     accountName: "HDFC Credit Card",
//     amount: 250,
//     type: "income",
//     date: new Date("2026-07-10T12:10:00"),
//     icon: "gift-outline",
//   },
// ] as const;

// type RecentTransaction = (typeof recentTransactions)[number];

// type RecentTransactionRowProps = {
//   item: RecentTransaction;
//   isLast: boolean;
// };

// function formatTransactionDate(date: Date) {
//   const now = new Date();

//   const isToday =
//     date.getDate() === now.getDate() &&
//     date.getMonth() === now.getMonth() &&
//     date.getFullYear() === now.getFullYear();

//   const time = new Intl.DateTimeFormat("en-IN", {
//     hour: "numeric",
//     minute: "2-digit",
//   }).format(date);

//   if (isToday) {
//     return `Today, ${time}`;
//   }

//   return new Intl.DateTimeFormat("en-IN", {
//     day: "numeric",
//     month: "short",
//     hour: "numeric",
//     minute: "2-digit",
//   }).format(date);
// }

// function RecentTransactionRow({ item, isLast }: RecentTransactionRowProps) {
//   const isExpense = item.type === "expense";
//   const isIncome = item.type === "income";

//   const amountPrefix = isExpense ? "−" : isIncome ? "+" : "";

//   const amountColor = isExpense
//     ? "text-red-500"
//     : isIncome
//       ? "text-green-600"
//       : "text-gray-900";

//   const iconBackground = isExpense
//     ? "bg-red-50"
//     : isIncome
//       ? "bg-green-50"
//       : "bg-gray-100";

//   const iconColor = isExpense ? "#ef4444" : isIncome ? "#16a34a" : "#4b5563";

//   return (
//     <Pressable
//       className={`flex-row items-center py-3 ${
//         isLast ? "" : "border-b border-gray-100"
//       }`}
//       onPress={() => {}}
//       android_ripple={{
//         color: "#e5e7eb",
//         alpha: 0.3,
//       }}
//     >
//       {/* Transaction Icon */}
//       <View
//         className={`size-11 items-center justify-center rounded-full ${iconBackground}`}
//       >
//         <Ionicons name={item.icon} size={21} color={iconColor} />
//       </View>

//       {/* Transaction Details */}
//       <View className="ml-3 flex-1">
//         <Text
//           className="text-base font-semibold text-gray-900"
//           numberOfLines={1}
//         >
//           {item.title}
//         </Text>

//         <Text className="mt-0.5 text-xs text-gray-500" numberOfLines={1}>
//           {item.subtitle} · {item.accountName}
//         </Text>
//       </View>

//       {/* Amount and Date */}
//       <View className="ml-3 items-end">
//         <Text className={`text-base font-bold ${amountColor}`}>
//           {amountPrefix}₹{formatAmount(item.amount)}
//         </Text>

//         <Text className="mt-0.5 text-xs text-gray-400">
//           {formatTransactionDate(item.date)}
//         </Text>
//       </View>
//     </Pressable>
//   );
// }

// // function RecentTransactions() {
// //   return (
// //     <View className="px-4">
// //       {/* Section Header */}
// //       <View className="mb-1 flex-row items-center justify-between">
// //         <Text className="text-lg font-bold text-gray-900">
// //           Recent Transactions
// //         </Text>

// //         <Pressable onPress={() => {}} hitSlop={8}>
// //           <Text className="text-sm font-semibold text-gray-500">View all</Text>
// //         </Pressable>
// //       </View>

// //       {/* Transactions */}
// //       <View>
// //         {recentTransactions.map((item, index) => (
// //           <RecentTransactionRow
// //             key={item.id}
// //             item={item}
// //             isLast={index === recentTransactions.length - 1}
// //           />
// //         ))}
// //       </View>
// //     </View>
// //   );
// // }

// function RecentTransactions() {
//   return (
//     <View className="flex-1 px-4">
//       {/* Fixed Header */}
//       <View className="mb-1 flex-row items-center justify-between">
//         <Text className="text-lg font-bold text-gray-900">
//           Recent Transactions
//         </Text>

//         <Pressable onPress={() => {}} hitSlop={8}>
//           <Text className="text-sm font-semibold text-gray-500">View all</Text>
//         </Pressable>
//       </View>

//       {/* Scrollable Items */}
//       <FlatList
//         data={recentTransactions}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item, index }) => (
//           <RecentTransactionRow
//             item={item}
//             isLast={index === recentTransactions.length - 1}
//           />
//         )}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// }
// export default function DashboardScreen() {
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: "white",
//       }}
//     >
//       <View className="px-4 pt-4">
//         <Header />
//         <ExpenseCard />
//       </View>
//       <View className="p-5">
//         <AccountList />
//       </View>
//       <RecentTransactions />
//     </SafeAreaView>
//   );
// }
