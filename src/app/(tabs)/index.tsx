import AccountsOverview from "@/components/dashboard/AccountsOverview";
import BudgetOverviewCard from "@/components/dashboard/BudgetOverviewCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { View } from "react-native";

export default function DashboardScreen() {
  return (
    <View className="flex-1 pt-safe bg-white dark:bg-slate-950">
      <View className="px-4 pt-3 pb-1">
        <DashboardHeader />
        <BudgetOverviewCard />
      </View>

      <RecentTransactions header={<AccountsOverview />} />
    </View>
  );
}

// import AccountsOverview from "@/components/dashboard/AccountsOverview";
// import BudgetOverviewCard from "@/components/dashboard/BudgetOverviewCard";
// import DashboardHeader from "@/components/dashboard/DashboardHeader";
// import RecentTransactions from "@/components/dashboard/RecentTransactions";
// import { View } from "react-native";

// export default function DashboardScreen() {
//   return (
//     <View className="flex-1 pt-safe">
//       <View className="px-4 pt-3">
//         <DashboardHeader />
//         <BudgetOverviewCard />
//         <AccountsOverview />
//         <RecentTransactions />
//       </View>
//     </View>
//   );
// }

// import AccountsOverview from "@/components/dashboard/AccountsOverview";
// import BudgetOverviewCard from "@/components/dashboard/BudgetOverviewCard";
// import DashboardHeader from "@/components/dashboard/DashboardHeader";
// import RecentTransactionsHeader from "@/components/dashboard/RecentTransactionsHeader";
// import { formatAmount, formatTransactionDate } from "@/utils/format";
// import { Ionicons } from "@react-native-vector-icons/ionicons";
// import { FlatList, Pressable, Text, View } from "react-native";

// /* -------------------------------------------------------------------------- */
// /*                                    Types                                   */
// /* -------------------------------------------------------------------------- */

// type AccountBalanceType = "asset" | "liability" | "receivable";

// type TransactionType = "expense" | "income" | "transfer" | "payment" | "refund";

// /* -------------------------------------------------------------------------- */
// /*                                  Mock Data                                 */
// /* -------------------------------------------------------------------------- */
// /*
//  * Replace these values with your real SQLite/API/store data when available.
//  */

// // const usedBudget = 32_000;
// // const totalBudget = 50_000;

// // const accountItems = [
// //   {
// //     id: "credit-cards",
// //     name: "Credit Cards",
// //     amount: 20_000.21,
// //     balanceType: "liability",
// //     icon: "card-outline",
// //   },
// //   {
// //     id: "banks",
// //     name: "Banks",
// //     amount: 100_000,
// //     balanceType: "asset",
// //     icon: "business-outline",
// //   },
// //   {
// //     id: "cash",
// //     name: "Cash",
// //     amount: 20_000,
// //     balanceType: "asset",
// //     icon: "cash-outline",
// //   },
// //   {
// //     id: "payable",
// //     name: "Payable",
// //     amount: 20_000,
// //     balanceType: "liability",
// //     icon: "arrow-up-circle-outline",
// //   },
// //   {
// //     id: "receivable",
// //     name: "Receivable",
// //     amount: 20_000,
// //     balanceType: "receivable",
// //     icon: "arrow-down-circle-outline",
// //   },
// // ] as const;

// export type RecentTransaction = {
//   id: string;
//   title: string;
//   category: string;
//   accountName: string;
//   amount: number;
//   type: TransactionType;
//   date: Date;
//   icon: React.ComponentProps<typeof Ionicons>["name"];
// };

// const recentTransactions: RecentTransaction[] = [
//   {
//     id: "1",
//     title: "Amazon",
//     category: "Shopping",
//     accountName: "ICICI Credit Card",
//     amount: 1_899,
//     type: "expense",
//     date: new Date("2026-07-12T18:45:00"),
//     icon: "bag-handle-outline",
//   },
//   {
//     id: "2",
//     title: "Credit Card Payment",
//     category: "Card Payment",
//     accountName: "SBI Bank",
//     amount: 5_000,
//     type: "payment",
//     date: new Date("2026-07-11T14:20:00"),
//     icon: "swap-horizontal-outline",
//   },
//   {
//     id: "3",
//     title: "BigBasket",
//     category: "Groceries",
//     accountName: "HDFC Bank",
//     amount: 2_340,
//     type: "expense",
//     date: new Date("2026-07-10T19:10:00"),
//     icon: "cart-outline",
//   },
//   {
//     id: "4",
//     title: "Fuel",
//     category: "Auto",
//     accountName: "ICICI Credit Card",
//     amount: 1_250,
//     type: "expense",
//     date: new Date("2026-07-10T11:35:00"),
//     icon: "car-outline",
//   },
//   {
//     id: "5",
//     title: "Salary",
//     category: "Income",
//     accountName: "SBI Bank",
//     amount: 13_000,
//     type: "income",
//     date: new Date("2026-07-09T09:15:00"),
//     icon: "wallet-outline",
//   },
// ] as const;

// /* -------------------------------------------------------------------------- */
// /*                                Derived Types                               */
// /* -------------------------------------------------------------------------- */

// // type AccountItem = (typeof accountItems)[number];

// // commmented export type RecentTransaction = (typeof recentTransactions)[number];

// /* -------------------------------------------------------------------------- */
// /*                                  Constants                                 */
// /* -------------------------------------------------------------------------- */

// const SCREEN_HORIZONTAL_PADDING = 16;
// const ACCOUNT_CARD_GAP = 10;

// /* -------------------------------------------------------------------------- */
// /*                                  Utilities                                 */
// /* -------------------------------------------------------------------------- */

// // const formatAmount = (amount: number) =>
// //   new Intl.NumberFormat("en-IN", {
// //     maximumFractionDigits: 2,
// //   }).format(amount);

// // const formatWholeAmount = (amount: number) =>
// //   new Intl.NumberFormat("en-IN", {
// //     maximumFractionDigits: 0,
// //   }).format(amount);

// // function formatTransactionDate(date: Date) {
// //   const now = new Date();

// //   const isToday =
// //     date.getDate() === now.getDate() &&
// //     date.getMonth() === now.getMonth() &&
// //     date.getFullYear() === now.getFullYear();

// //   const time = new Intl.DateTimeFormat("en-IN", {
// //     hour: "numeric",
// //     minute: "2-digit",
// //   }).format(date);

// //   if (isToday) {
// //     return `Today, ${time}`;
// //   }

// //   return new Intl.DateTimeFormat("en-IN", {
// //     day: "numeric",
// //     month: "short",
// //     hour: "numeric",
// //     minute: "2-digit",
// //   }).format(date);
// // }

// /* -------------------------------------------------------------------------- */
// /*                                   Header                                   */
// /* -------------------------------------------------------------------------- */

// // function DashboardHeader() {
// //   const router = useRouter();

// //   return (
// //     <View className="flex-row items-center justify-between">
// //       <View className="flex-1 pr-4">
// //         <LiveDateTime />
// //         <Text className="mt-0.5  text-slate-500 dark:text-slate-400">
// //           Welcome back, Satish!
// //         </Text>
// //       </View>

// //       <View className="size-12 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
// //         <Pressable
// //           className="flex-1 items-center justify-center"
// //           android_ripple={{
// //             color: "rgba(100, 116, 139, 0.25)",
// //             borderless: false,
// //           }}
// //           onPress={() => router.push("/profile")}
// //         >
// //           <Ionicons name="person" size={24} color="#64748b" />
// //         </Pressable>
// //       </View>
// //     </View>
// //   );
// // }

// // /* -------------------------------------------------------------------------- */
// // /*                              Budget Stat Item                              */
// // /* -------------------------------------------------------------------------- */

// // type BudgetStatProps = {
// //   label: string;
// //   value: string;
// //   icon:
// //     | "wallet-outline"
// //     | "calendar-outline"
// //     | "shield-checkmark-outline"
// //     | "pie-chart-outline";
// //   tone: "green" | "neutral" | "blue" | "red";
// //   showDivider?: boolean;
// // };

// // function BudgetStat({
// //   label,
// //   value,
// //   icon,
// //   tone,
// //   showDivider = false,
// // }: BudgetStatProps) {
// //   const toneStyles = {
// //     green: {
// //       text: "text-emerald-600",
// //       background: "bg-emerald-50",
// //       iconColor: "#059669",
// //     },
// //     neutral: {
// //       text: "text-slate-900",
// //       background: "bg-slate-100",
// //       iconColor: "#475569",
// //     },
// //     blue: {
// //       text: "text-blue-600",
// //       background: "bg-blue-50",
// //       iconColor: "#2563eb",
// //     },
// //     red: {
// //       text: "text-red-500",
// //       background: "bg-red-50",
// //       iconColor: "#ef4444",
// //     },
// //   } as const;

// //   const colors = toneStyles[tone];

// //   return (
// //     <View
// //       className={`flex-1 items-center px-1 ${
// //         showDivider ? "border-l border-slate-200" : ""
// //       }`}
// //     >
// //       <Text className="text-center text-xs text-slate-500" numberOfLines={1}>
// //         {label}
// //       </Text>

// //       <Text
// //         className={`mt-1 text-center text-sm font-bold ${colors.text}`}
// //         numberOfLines={1}
// //         adjustsFontSizeToFit
// //         minimumFontScale={0.8}
// //       >
// //         {value}
// //       </Text>

// //       <View
// //         className={`mt-2 size-8 items-center justify-center rounded-full ${colors.background}`}
// //       >
// //         <Ionicons name={icon} size={17} color={colors.iconColor} />
// //       </View>
// //     </View>
// //   );
// // }

// /* -------------------------------------------------------------------------- */
// /*                            Budget Overview Card                            */
// /* -------------------------------------------------------------------------- */

// // function BudgetOverviewCard() {
// //   const remainingBudget = Math.max(totalBudget - usedBudget, 0);

// //   const rawUsedPercent = totalBudget > 0 ? (usedBudget / totalBudget) * 100 : 0;

// //   const progressPercent = Math.min(Math.max(rawUsedPercent, 0), 100);

// //   const remainingPercent =
// //     totalBudget > 0 ? Math.max(100 - rawUsedPercent, 0) : 0;

// //   const now = new Date();

// //   const lastDayOfMonth = new Date(
// //     now.getFullYear(),
// //     now.getMonth() + 1,
// //     0,
// //   ).getDate();

// //   // Includes today as an available spending day.
// //   const remainingDays = Math.max(lastDayOfMonth - now.getDate(), 0);

// //   const dailySafeSpend =
// //     remainingDays > 0 ? remainingBudget / remainingDays : 0;

// //   return (
// //     <View className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
// //       {/* Top Label */}
// //       <Text className="text-xs font-semibold uppercase tracking-wide text-slate-500">
// //         Monthly Budget
// //       </Text>

// //       {/* Title + Budget Amount */}
// //       <View className="mt-1 flex-row items-center justify-between gap-3">
// //         <Text className="flex-1 text-xl font-bold text-slate-950">
// //           Budget Overview
// //         </Text>

// //         <View className="flex-row items-baseline">
// //           <Text className="text-base font-bold text-red-500">
// //             ₹{formatWholeAmount(usedBudget)}
// //           </Text>

// //           <Text className="mx-1 text-sm text-slate-400">/</Text>

// //           <Text className="text-base font-bold text-emerald-600">
// //             ₹{formatWholeAmount(totalBudget)}
// //           </Text>
// //         </View>
// //       </View>

// //       {/* Progress Bar */}
// //       <View className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-200">
// //         <View
// //           className="h-full rounded-full bg-red-500"
// //           style={{
// //             width: `${progressPercent}%`,
// //           }}
// //         />
// //       </View>

// //       {/* Progress Labels */}
// //       <View className="mt-2 flex-row items-center justify-between">
// //         <Text className="text-xs font-semibold text-red-500">
// //           {rawUsedPercent.toFixed(0)}% of budget used
// //         </Text>

// //         <Text className="text-xs font-semibold text-emerald-600">
// //           {remainingPercent.toFixed(0)}% Remaining
// //         </Text>
// //       </View>

// //       {/* Statistics */}
// //       <View className="mt-5 flex-row">
// //         <BudgetStat
// //           label="Remaining"
// //           value={`₹${formatWholeAmount(remainingBudget)}`}
// //           icon="wallet-outline"
// //           tone="green"
// //         />

// //         <BudgetStat
// //           label="Days left"
// //           value={remainingDays.toString()}
// //           icon="calendar-outline"
// //           tone="neutral"
// //           showDivider
// //         />

// //         <BudgetStat
// //           label="Safe / day"
// //           value={`₹${formatWholeAmount(dailySafeSpend)}`}
// //           icon="shield-checkmark-outline"
// //           tone="blue"
// //           showDivider
// //         />

// //         <BudgetStat
// //           label="Spent"
// //           value={`₹${formatWholeAmount(usedBudget)}`}
// //           icon="pie-chart-outline"
// //           tone="red"
// //           showDivider
// //         />
// //       </View>
// //     </View>
// //   );
// // }

// /* -------------------------------------------------------------------------- */
// /*                                Account Card                                */
// /* -------------------------------------------------------------------------- */

// // type AccountCardProps = {
// //   item: AccountItem;
// //   width: number;
// // };

// // function AccountCard({ item, width }: AccountCardProps) {
// //   const isLiability = item.balanceType === "liability";
// //   const isReceivable = item.balanceType === "receivable";

// //   const iconColor = isLiability
// //     ? "#ef4444"
// //     : isReceivable
// //       ? "#059669"
// //       : item.id === "cash"
// //         ? "#059669"
// //         : "#475569";

// //   const iconBackground = isLiability
// //     ? "bg-red-50"
// //     : isReceivable || item.id === "cash"
// //       ? "bg-emerald-50"
// //       : "bg-slate-100";

// //   const amountColor = isLiability
// //     ? "text-red-500"
// //     : isReceivable
// //       ? "text-emerald-600"
// //       : "text-slate-950";

// //   return (
// //     <Pressable
// //       style={{ width }}
// //       className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3"
// //       onPress={() => {
// //         // Navigate to corresponding account screen here.
// //       }}
// //       android_ripple={{
// //         color: "#e2e8f0",
// //         alpha: 0.3,
// //       }}
// //     >
// //       <View
// //         className={`size-11 items-center justify-center rounded-full ${iconBackground}`}
// //       >
// //         <Ionicons name={item.icon} size={22} color={iconColor} />
// //       </View>

// //       <Text
// //         className="mt-3 text-xs font-bold uppercase text-slate-600"
// //         numberOfLines={1}
// //         ellipsizeMode="tail"
// //       >
// //         {item.name}
// //       </Text>

// //       <Text
// //         className={`mt-1 text-base font-bold ${amountColor}`}
// //         numberOfLines={1}
// //         adjustsFontSizeToFit
// //         minimumFontScale={0.8}
// //       >
// //         ₹{formatAmount(item.amount)}
// //       </Text>

// //       <View className="mt-3 items-end">
// //         <Ionicons name="chevron-forward" size={18} color="#64748b" />
// //       </View>
// //     </Pressable>
// //   );
// // }

// // /* -------------------------------------------------------------------------- */
// // /*                             Accounts Overview                              */
// // /* -------------------------------------------------------------------------- */

// // function AccountsOverview() {
// //   const { width: screenWidth } = useWindowDimensions();

// //   /*
// //    * Displays approximately 2.7 cards on a standard phone.
// //    * Minimum width prevents cards from becoming too narrow on small phones.
// //    */
// //   const availableWidth = screenWidth - SCREEN_HORIZONTAL_PADDING * 2;

// //   const cardWidth = Math.max(
// //     112,
// //     (availableWidth - ACCOUNT_CARD_GAP * 2) / 2.7,
// //   );

// //   return (
// //     <View className="mt-5">
// //       {/* Section Header */}
// //       <View className="mb-3 flex-row items-center justify-between">
// //         <Text className="text-lg font-bold text-slate-950">
// //           Accounts Overview
// //         </Text>

// //         <Pressable
// //           onPress={() => {
// //             // Navigate to all accounts screen.
// //           }}
// //           hitSlop={8}
// //         >
// //           <Text className="text-sm font-semibold text-blue-600">View all</Text>
// //         </Pressable>
// //       </View>

// //       {/* Horizontal Carousel */}
// //       <FlatList
// //         horizontal
// //         data={accountItems}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => <AccountCard item={item} width={cardWidth} />}
// //         ItemSeparatorComponent={() => (
// //           <View style={{ width: ACCOUNT_CARD_GAP }} />
// //         )}
// //         showsHorizontalScrollIndicator={false}
// //         snapToInterval={cardWidth + ACCOUNT_CARD_GAP}
// //         snapToAlignment="start"
// //         decelerationRate="fast"
// //         disableIntervalMomentum
// //       />
// //     </View>
// //   );
// // }

// /* -------------------------------------------------------------------------- */
// /*                          Recent Transaction Row                            */
// /* -------------------------------------------------------------------------- */

// type RecentTransactionRowProps = {
//   item: RecentTransaction;
// };

// function RecentTransactionRow({ item }: RecentTransactionRowProps) {
//   const isExpense = item.type === "expense";
//   const isIncome = item.type === "income" || item.type === "refund";

//   const amountPrefix = isExpense ? "−" : isIncome ? "+" : "";

//   const amountColor = isExpense
//     ? "text-red-500"
//     : isIncome
//       ? "text-emerald-600"
//       : "text-slate-950";

//   const iconBackground = isExpense
//     ? "bg-red-50"
//     : isIncome
//       ? "bg-emerald-50"
//       : "bg-slate-100";

//   const iconColor = isExpense ? "#ef4444" : isIncome ? "#059669" : "#475569";

//   return (
//     <Pressable
//       className="flex-row items-center py-3.5"
//       onPress={() => {
//         // Navigate to transaction details.
//       }}
//       android_ripple={{
//         color: "#e2e8f0",
//         alpha: 0.25,
//       }}
//     >
//       {/* Transaction Icon */}
//       <View
//         className={`size-11 items-center justify-center rounded-full ${iconBackground}`}
//       >
//         <Ionicons name={item.icon} size={21} color={iconColor} />
//       </View>

//       {/* Details */}
//       <View className="ml-3 min-w-0 flex-1">
//         <Text
//           className="text-base font-semibold text-slate-950"
//           numberOfLines={1}
//           ellipsizeMode="tail"
//         >
//           {item.title}
//         </Text>

//         <Text
//           className="mt-0.5 text-xs text-slate-500"
//           numberOfLines={1}
//           ellipsizeMode="tail"
//         >
//           {item.category} · {item.accountName}
//         </Text>
//       </View>

//       {/* Amount + Date */}
//       <View className="ml-3 max-w-[42%] items-end">
//         <Text
//           className={`text-base font-bold ${amountColor}`}
//           numberOfLines={1}
//           adjustsFontSizeToFit
//           minimumFontScale={0.8}
//         >
//           {amountPrefix}₹{formatAmount(item.amount)}
//         </Text>

//         <Text className="mt-0.5 text-xs text-slate-500" numberOfLines={1}>
//           {formatTransactionDate(item.date)}
//         </Text>
//       </View>
//     </Pressable>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                       Recent Transactions Header                           */
// /* -------------------------------------------------------------------------- */

// // function RecentTransactionsHeader() {
// //   return (
// //     <View className="mt-5 flex-row items-center justify-between">
// //       <Text className="text-lg font-bold text-slate-950">
// //         Recent Transactions
// //       </Text>

// //       <Pressable
// //         onPress={() => {
// //           // Navigate to transactions screen.
// //         }}
// //         hitSlop={8}
// //       >
// //         <Text className="text-sm font-semibold text-blue-600">View all</Text>
// //       </Pressable>
// //     </View>
// //   );
// // }

// /* -------------------------------------------------------------------------- */
// /*                           Dashboard List Header                            */
// /* -------------------------------------------------------------------------- */

// function DashboardListHeader() {
//   return (
//     <>
//       <AccountsOverview />
//       <RecentTransactionsHeader />
//     </>
//   );
// }

// function FixedComponents() {
//   return (
//     <View className="px-4 pt-3">
//       <DashboardHeader />
//       <BudgetOverviewCard />
//     </View>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                              Dashboard Screen                              */
// /* -------------------------------------------------------------------------- */

// export default function DashboardScreen() {
//   return (
//     <View className="flex-1 pt-safe">
//       <FixedComponents />
//       <FlatList
//         className="flex-1"
//         data={recentTransactions}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <RecentTransactionRow item={item} />}
//         ListHeaderComponent={<DashboardListHeader />}
//         ItemSeparatorComponent={() => <View className="h-px bg-slate-200" />}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
//           // paddingTop: 12,
//           paddingBottom: 32,
//         }}
//       />
//     </View>
//   );
// }
// // import { Ionicons } from "@react-native-vector-icons/ionicons";
// // import { Image } from "expo-image";
// // import { FlatList, Pressable, Text, View } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";

// // /* -------------------------------------------------------------------------- */
// // /*                                    Types                                   */
// // /* -------------------------------------------------------------------------- */

// // type BalanceType = "asset" | "liability" | "receivable";

// // type TransactionType = "expense" | "income" | "transfer";

// // /* -------------------------------------------------------------------------- */
// // /*                                  Mock Data                                 */
// // /* -------------------------------------------------------------------------- */

// // const usedBudget = 2_012;
// // const totalBudget = 20_000;

// // const accountItems = [
// //   {
// //     id: "credit-cards",
// //     name: "Credit Cards",
// //     amount: 20_000.21,
// //     balanceType: "liability",
// //     icon: "card-outline",
// //   },
// //   {
// //     id: "banks",
// //     name: "Banks",
// //     amount: 20_000,
// //     balanceType: "asset",
// //     icon: "business-outline",
// //   },
// //   {
// //     id: "cash",
// //     name: "Cash",
// //     amount: 20_000,
// //     balanceType: "asset",
// //     icon: "cash-outline",
// //   },
// //   {
// //     id: "payable",
// //     name: "Payable",
// //     amount: 20_000,
// //     balanceType: "liability",
// //     icon: "arrow-up-circle-outline",
// //   },
// //   {
// //     id: "receivable",
// //     name: "Receivable",
// //     amount: 20_000,
// //     balanceType: "receivable",
// //     icon: "arrow-down-circle-outline",
// //   },
// // ] as const;

// // const recentTransactions = [
// //   {
// //     id: "1",
// //     title: "Indian Oil",
// //     subtitle: "Fuel",
// //     accountName: "HDFC Credit Card",
// //     amount: 2_500,
// //     type: "expense",
// //     date: new Date("2026-07-14T10:32:00"),
// //     icon: "car-outline",
// //   },
// //   {
// //     id: "2",
// //     title: "Salary",
// //     subtitle: "Income",
// //     accountName: "SBI Bank",
// //     amount: 13_000,
// //     type: "income",
// //     date: new Date("2026-07-13T09:15:00"),
// //     icon: "wallet-outline",
// //   },
// //   {
// //     id: "3",
// //     title: "Amazon",
// //     subtitle: "Shopping",
// //     accountName: "ICICI Credit Card",
// //     amount: 1_899,
// //     type: "expense",
// //     date: new Date("2026-07-12T18:45:00"),
// //     icon: "bag-handle-outline",
// //   },
// //   {
// //     id: "4",
// //     title: "Credit Card Payment",
// //     subtitle: "Card Payment",
// //     accountName: "SBI Bank",
// //     amount: 5_000,
// //     type: "transfer",
// //     date: new Date("2026-07-11T14:20:00"),
// //     icon: "swap-horizontal-outline",
// //   },
// //   {
// //     id: "5",
// //     title: "Cashback",
// //     subtitle: "Reward",
// //     accountName: "HDFC Credit Card",
// //     amount: 250,
// //     type: "income",
// //     date: new Date("2026-07-10T12:10:00"),
// //     icon: "gift-outline",
// //   },
// // ] as const;

// // /* -------------------------------------------------------------------------- */
// // /*                                Derived Types                               */
// // /* -------------------------------------------------------------------------- */

// // type AccountItem = (typeof accountItems)[number];

// // type RecentTransaction = (typeof recentTransactions)[number];

// // /* -------------------------------------------------------------------------- */
// // /*                                  Utilities                                 */
// // /* -------------------------------------------------------------------------- */

// // const formatAmount = (amount: number) =>
// //   new Intl.NumberFormat("en-IN", {
// //     maximumFractionDigits: 2,
// //   }).format(amount);

// // function formatTransactionDate(date: Date) {
// //   const now = new Date();

// //   const isToday =
// //     date.getDate() === now.getDate() &&
// //     date.getMonth() === now.getMonth() &&
// //     date.getFullYear() === now.getFullYear();

// //   const time = new Intl.DateTimeFormat("en-IN", {
// //     hour: "numeric",
// //     minute: "2-digit",
// //   }).format(date);

// //   if (isToday) {
// //     return `Today, ${time}`;
// //   }

// //   return new Intl.DateTimeFormat("en-IN", {
// //     day: "numeric",
// //     month: "short",
// //     hour: "numeric",
// //     minute: "2-digit",
// //   }).format(date);
// // }

// // /* -------------------------------------------------------------------------- */
// // /*                                   Header                                   */
// // /* -------------------------------------------------------------------------- */

// // function Header() {
// //   const formattedDate = new Intl.DateTimeFormat("en-IN", {
// //     day: "numeric",
// //     month: "long",
// //     year: "numeric",
// //   }).format(new Date());

// //   return (
// //     <View className="w-full flex-row items-center justify-between">
// //       <View>
// //         <Text className="text-lg font-bold text-gray-900">{formattedDate}</Text>

// //         <Text className="text-sm text-gray-500">Welcome back, Satish!</Text>
// //       </View>

// //       <View className="overflow-hidden rounded-full bg-gray-200 p-1">
// //         <Image
// //           source={require("@/assets/images/person.png")}
// //           contentFit="cover"
// //           style={{
// //             width: 36,
// //             height: 36,
// //           }}
// //           transition={200}
// //         />
// //       </View>
// //     </View>
// //   );
// // }

// // /* -------------------------------------------------------------------------- */
// // /*                                Expense Card                                */
// // /* -------------------------------------------------------------------------- */

// // function ExpenseCard() {
// //   const remainingBudget = Math.max(totalBudget - usedBudget, 0);

// //   const rawUsedPercent = totalBudget > 0 ? (usedBudget / totalBudget) * 100 : 0;

// //   const progressPercent = Math.min(Math.max(rawUsedPercent, 0), 100);

// //   return (
// //     <View className="mt-4 w-full rounded-2xl border border-gray-200 bg-white p-3">
// //       {/* Header */}
// //       <View className="flex-row items-center justify-between gap-4">
// //         <Text className="text-sm font-bold uppercase text-gray-900">
// //           Remaining Budget
// //         </Text>

// //         <Text className="text-sm text-gray-500">
// //           Expense: ₹{formatAmount(usedBudget)}
// //         </Text>
// //       </View>

// //       {/* Primary Amount */}
// //       <View className="w-full flex-row items-end">
// //         <View className="flex-row items-baseline">
// //           <Text className="mr-1 text-3xl font-semibold text-gray-400">₹</Text>

// //           <Text className="text-5xl font-bold tracking-tight text-gray-900">
// //             {formatAmount(remainingBudget)}
// //           </Text>

// //           <Text className="text-2xl font-bold text-gray-400">.00</Text>
// //         </View>
// //       </View>

// //       {/* Progress Bar */}
// //       <View className="my-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
// //         <View
// //           className="h-full rounded-full bg-gray-600"
// //           style={{
// //             width: `${progressPercent}%`,
// //           }}
// //         />
// //       </View>

// //       {/* Details */}
// //       <View className="flex-row items-center justify-between gap-4">
// //         <Text className="text-sm text-gray-500">
// //           ₹{formatAmount(usedBudget)} of ₹{formatAmount(totalBudget)} used
// //         </Text>

// //         <Text className="text-sm font-medium text-gray-500">
// //           {rawUsedPercent.toFixed(1)}%
// //         </Text>
// //       </View>
// //     </View>
// //   );
// // }

// // /* -------------------------------------------------------------------------- */
// // /*                                 Account Row                                */
// // /* -------------------------------------------------------------------------- */

// // type AccountRowProps = {
// //   item: AccountItem;
// //   isLast: boolean;
// // };

// // function AccountRow({ item, isLast }: AccountRowProps) {
// //   const isLiability = item.balanceType === "liability";
// //   const isReceivable = item.balanceType === "receivable";

// //   const iconColor = isLiability
// //     ? "#ef4444"
// //     : isReceivable
// //       ? "#16a34a"
// //       : "#4b5563";

// //   const iconBackground = isLiability
// //     ? "bg-red-50"
// //     : isReceivable
// //       ? "bg-green-50"
// //       : "bg-gray-100";

// //   const amountColor = isLiability
// //     ? "text-red-500"
// //     : isReceivable
// //       ? "text-green-600"
// //       : "text-gray-900";

// //   return (
// //     <Pressable
// //       className={`w-full flex-row items-center justify-between px-4 py-3 ${
// //         isLast ? "" : "border-b border-gray-200"
// //       }`}
// //       onPress={() => {}}
// //       android_ripple={{
// //         color: "#d1d5db",
// //         alpha: 0.15,
// //       }}
// //     >
// //       {/* Left */}
// //       <View className="flex-row items-center">
// //         <View
// //           className={`size-10 items-center justify-center rounded-full ${iconBackground}`}
// //         >
// //           <Ionicons name={item.icon} size={20} color={iconColor} />
// //         </View>

// //         <Text className="ml-3 font-bold uppercase text-gray-600">
// //           {item.name}
// //         </Text>
// //       </View>

// //       {/* Right */}
// //       <View className="flex-row items-center gap-2">
// //         <Text className={`font-bold ${amountColor}`}>
// //           ₹{formatAmount(item.amount)}
// //         </Text>

// //         <Ionicons name="chevron-forward" size={20} color="#6b7280" />
// //       </View>
// //     </Pressable>
// //   );
// // }

// // /* -------------------------------------------------------------------------- */
// // /*                                Account List                                */
// // /* -------------------------------------------------------------------------- */

// // function AccountList() {
// //   return (
// //     <View className="overflow-hidden rounded-2xl border border-gray-200">
// //       {accountItems.map((item, index) => (
// //         <AccountRow
// //           key={item.id}
// //           item={item}
// //           isLast={index === accountItems.length - 1}
// //         />
// //       ))}
// //     </View>
// //   );
// // }

// // /* -------------------------------------------------------------------------- */
// // /*                          Recent Transaction Row                            */
// // /* -------------------------------------------------------------------------- */

// // type RecentTransactionRowProps = {
// //   item: RecentTransaction;
// // };

// // function RecentTransactionRow({ item }: RecentTransactionRowProps) {
// //   const isExpense = item.type === "expense";
// //   const isIncome = item.type === "income";

// //   const amountPrefix = isExpense ? "−" : isIncome ? "+" : "";

// //   const amountColor = isExpense
// //     ? "text-red-500"
// //     : isIncome
// //       ? "text-green-600"
// //       : "text-gray-900";

// //   const iconBackground = isExpense
// //     ? "bg-red-50"
// //     : isIncome
// //       ? "bg-green-50"
// //       : "bg-gray-100";

// //   const iconColor = isExpense ? "#ef4444" : isIncome ? "#16a34a" : "#4b5563";

// //   return (
// //     <Pressable
// //       className="flex-row items-center py-3"
// //       onPress={() => {}}
// //       android_ripple={{
// //         color: "#e5e7eb",
// //         alpha: 0.3,
// //       }}
// //     >
// //       {/* Icon */}
// //       <View
// //         className={`size-11 items-center justify-center rounded-full ${iconBackground}`}
// //       >
// //         <Ionicons name={item.icon} size={21} color={iconColor} />
// //       </View>

// //       {/* Details */}
// //       <View className="ml-3 flex-1">
// //         <Text
// //           className="text-base font-semibold text-gray-900"
// //           numberOfLines={1}
// //         >
// //           {item.title}
// //         </Text>

// //         <Text className="mt-0.5 text-xs text-gray-500" numberOfLines={1}>
// //           {item.subtitle} · {item.accountName}
// //         </Text>
// //       </View>

// //       {/* Amount and Date */}
// //       <View className="ml-3 items-end">
// //         <Text className={`text-base font-bold ${amountColor}`}>
// //           {amountPrefix}₹{formatAmount(item.amount)}
// //         </Text>

// //         <Text className="mt-0.5 text-xs text-gray-400">
// //           {formatTransactionDate(item.date)}
// //         </Text>
// //       </View>
// //     </Pressable>
// //   );
// // }

// // /* -------------------------------------------------------------------------- */
// // /*                            Recent Transactions                             */
// // /* -------------------------------------------------------------------------- */

// // function RecentTransactions() {
// //   return (
// //     <View className="flex-1 px-4">
// //       {/* Fixed Header */}
// //       <View className="mb-1 flex-row items-center justify-between">
// //         <Text className="text-lg font-bold text-gray-900">
// //           Recent Transactions
// //         </Text>

// //         <Pressable onPress={() => {}} hitSlop={8}>
// //           <Text className="text-sm font-semibold text-gray-500">View all</Text>
// //         </Pressable>
// //       </View>

// //       {/* Scrollable List */}
// //       <FlatList
// //         data={recentTransactions}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => <RecentTransactionRow item={item} />}
// //         ItemSeparatorComponent={() => <View className="h-px bg-gray-100" />}
// //         showsVerticalScrollIndicator={false}
// //         contentContainerStyle={{
// //           paddingBottom: 24,
// //         }}
// //       />
// //     </View>
// //   );
// // }

// // /* -------------------------------------------------------------------------- */
// // /*                              Dashboard Screen                              */
// // /* -------------------------------------------------------------------------- */

// // export default function DashboardScreen() {
// //   return (
// //     <SafeAreaView
// //       style={{
// //         flex: 1,
// //         backgroundColor: "white",
// //       }}
// //     >
// //       {/* Header + Budget */}
// //       <View className="px-4 pt-4">
// //         <Header />
// //         <ExpenseCard />
// //       </View>

// //       {/* Accounts */}
// //       <View className="p-4">
// //         <AccountList />
// //       </View>

// //       {/* Recent Transactions */}
// //       <RecentTransactions />
// //     </SafeAreaView>
// //   );
// // }
// // // import { Ionicons } from "@react-native-vector-icons/ionicons";
// // // import { Image } from "expo-image";
// // // import { FlatList, Pressable, Text, View } from "react-native";
// // // import { SafeAreaView } from "react-native-safe-area-context";

// // // const usedBudget = 2012;
// // // const totalBudget = 20000;

// // // // const accountItems = [
// // // //   { id: "credit-cards", name: "Credit Cards", amount: 20000.21, payable: true },
// // // //   { id: "banks", name: "Banks", amount: 20000, payable: false },
// // // //   { id: "cash", name: "Cash", amount: 20000, payable: false },
// // // //   { id: "payable", name: "Payable", amount: 20000, payable: true },
// // // //   { id: "receivable", name: "Receivable", amount: 20000, payable: false },
// // // // ] as const;
// // // const accountItems = [
// // //   {
// // //     id: "credit-cards",
// // //     name: "Credit Cards",
// // //     amount: 20000.21,
// // //     payable: true,
// // //     icon: "card-outline",
// // //   },
// // //   {
// // //     id: "banks",
// // //     name: "Banks",
// // //     amount: 20000,
// // //     payable: false,
// // //     icon: "business-outline",
// // //   },
// // //   {
// // //     id: "cash",
// // //     name: "Cash",
// // //     amount: 20000,
// // //     payable: false,
// // //     icon: "cash-outline",
// // //   },
// // //   {
// // //     id: "payable",
// // //     name: "Payable",
// // //     amount: 20000,
// // //     payable: true,
// // //     icon: "arrow-up-circle-outline",
// // //   },
// // //   {
// // //     id: "receivable",
// // //     name: "Receivable",
// // //     amount: 20000,
// // //     payable: false,
// // //     icon: "arrow-down-circle-outline",
// // //   },
// // // ] as const;

// // // const formatAmount = (amount: number) =>
// // //   new Intl.NumberFormat("en-IN", {
// // //     maximumFractionDigits: 2,
// // //   }).format(amount);

// // // function Header() {
// // //   const formattedDate = new Intl.DateTimeFormat("en-IN", {
// // //     day: "numeric",
// // //     month: "long",
// // //     year: "numeric",
// // //   }).format(new Date());

// // //   return (
// // //     <View className="w-full flex-row items-center justify-between">
// // //       <View>
// // //         <Text className="text-lg font-bold text-gray-900">{formattedDate}</Text>
// // //         <Text className="text-sm text-gray-500">Welcome back, Satish!</Text>
// // //       </View>

// // //       <View className="overflow-hidden rounded-full bg-gray-200 p-1">
// // //         <Image
// // //           source={require("@/assets/images/person.png")}
// // //           contentFit="cover"
// // //           style={{ width: 36, height: 36 }}
// // //           transition={200}
// // //         />
// // //       </View>
// // //     </View>
// // //   );
// // // }

// // // function ExpenseCard() {
// // //   const rawUsedPercent = totalBudget > 0 ? (usedBudget / totalBudget) * 100 : 0;
// // //   const progressPercent = Math.min(Math.max(rawUsedPercent, 0), 100);

// // //   return (
// // //     <View className="mt-4 w-full rounded-2xl border border-gray-200 bg-white p-3">
// // //       {/* Header */}
// // //       <View className="flex-row items-center justify-between gap-4">
// // //         <Text className="text-sm font-bold uppercase text-gray-900">
// // //           Monthly Budget
// // //         </Text>
// // //         <Text className="text-sm text-gray-500">
// // //           Total Expense: ₹{formatAmount(usedBudget)}
// // //         </Text>
// // //       </View>

// // //       {/* Total Budget */}
// // //       <View className="w-full flex-row items-end">
// // //         <View className="flex-row items-baseline">
// // //           <Text className="mr-1 text-5xl font-bold text-gray-400">₹</Text>

// // //           <Text className="text-5xl font-bold text-gray-900">
// // //             {formatAmount(totalBudget)}
// // //           </Text>

// // //           <Text className="text-2xl font-bold text-gray-400">.00</Text>
// // //         </View>
// // //       </View>

// // //       {/* Progress */}
// // //       <View className="my-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
// // //         <View
// // //           className="h-full rounded-full bg-gray-600"
// // //           style={{
// // //             width: `${progressPercent}%`,
// // //           }}
// // //         />
// // //       </View>

// // //       {/* Details */}
// // //       <View className="flex-row items-center justify-between gap-4">
// // //         <Text className="text-sm text-gray-500">
// // //           ₹{formatAmount(usedBudget)} used
// // //         </Text>

// // //         <Text className="text-sm text-gray-500">
// // //           {rawUsedPercent.toFixed(1)}% used
// // //         </Text>
// // //       </View>
// // //     </View>
// // //   );
// // // }

// // // type AccountItem = (typeof accountItems)[number];

// // // type AccountRowProps = {
// // //   item: AccountItem;
// // //   isLast: boolean;
// // // };

// // // // function AccountRow({ item, isLast }: AccountRowProps) {
// // // //   return (
// // // //     <Pressable
// // // //       className={`w-full flex-row items-center justify-between px-5 py-4 ${
// // // //         isLast ? "" : "border-b border-gray-200"
// // // //       }`}
// // // //       onPress={() => {}}
// // // //       android_ripple={{
// // // //         color: item.payable ? "#f00" : "#0f0",
// // // //         alpha: 0.1,
// // // //       }}
// // // //     >
// // // //       <Text className="font-bold uppercase text-gray-600">{item.name}</Text>

// // // //       <View className="flex-row items-center gap-2">
// // // //         <Text
// // // //           className={`font-bold ${item.payable ? "text-red-500" : "text-green-500"} text-gray-600`}
// // // //         >
// // // //           ₹{formatAmount(item.amount)}
// // // //         </Text>

// // // //         <Ionicons name="chevron-forward" size={20} color="#6b7280" />
// // // //       </View>
// // // //     </Pressable>
// // // //   );
// // // // }

// // // function AccountRow({ item, isLast }: AccountRowProps) {
// // //   const iconColor = item.payable ? "#ef4444" : "#16a34a";

// // //   const iconBackground = item.payable ? "bg-red-50" : "bg-green-50";

// // //   return (
// // //     <Pressable
// // //       className={`w-full flex-row items-center justify-between px-4 py-3 ${
// // //         isLast ? "" : "border-b border-gray-200"
// // //       }`}
// // //       onPress={() => {}}
// // //       android_ripple={{
// // //         color: item.payable ? "#ef4444" : "#16a34a",
// // //         alpha: 0.1,
// // //       }}
// // //     >
// // //       {/* Left: Icon + Account Name */}
// // //       <View className="flex-row items-center">
// // //         <View
// // //           className={`size-10 items-center justify-center rounded-full ${iconBackground}`}
// // //         >
// // //           <Ionicons name={item.icon} size={20} color={iconColor} />
// // //         </View>

// // //         <Text className="ml-3 font-bold uppercase text-gray-600">
// // //           {item.name}
// // //         </Text>
// // //       </View>

// // //       {/* Right: Amount + Chevron */}
// // //       <View className="flex-row items-center gap-2">
// // //         <Text
// // //           className={`font-bold ${
// // //             item.payable ? "text-red-500" : "text-green-600"
// // //           }`}
// // //         >
// // //           ₹{formatAmount(item.amount)}
// // //         </Text>

// // //         <Ionicons name="chevron-forward" size={20} color="#6b7280" />
// // //       </View>
// // //     </Pressable>
// // //   );
// // // }

// // // function AccountList() {
// // //   return (
// // //     <View className="mt-2 border border-gray-200 rounded-2xl overflow-hidden">
// // //       {accountItems.map((item, index) => (
// // //         <AccountRow
// // //           key={item.id}
// // //           item={item}
// // //           isLast={index === accountItems.length - 1}
// // //         />
// // //       ))}
// // //     </View>
// // //   );
// // // }

// // // const recentTransactions = [
// // //   {
// // //     id: "1",
// // //     title: "Indian Oil",
// // //     subtitle: "Fuel",
// // //     accountName: "HDFC Credit Card",
// // //     amount: 2500,
// // //     type: "expense",
// // //     date: new Date("2026-07-14T10:32:00"),
// // //     icon: "car-outline",
// // //   },
// // //   {
// // //     id: "2",
// // //     title: "Salary",
// // //     subtitle: "Income",
// // //     accountName: "SBI Bank",
// // //     amount: 13000,
// // //     type: "income",
// // //     date: new Date("2026-07-13T09:15:00"),
// // //     icon: "wallet-outline",
// // //   },
// // //   {
// // //     id: "3",
// // //     title: "Amazon",
// // //     subtitle: "Shopping",
// // //     accountName: "ICICI Credit Card",
// // //     amount: 1899,
// // //     type: "expense",
// // //     date: new Date("2026-07-12T18:45:00"),
// // //     icon: "bag-handle-outline",
// // //   },
// // //   {
// // //     id: "4",
// // //     title: "Credit Card Payment",
// // //     subtitle: "Card Payment",
// // //     accountName: "SBI Bank",
// // //     amount: 5000,
// // //     type: "transfer",
// // //     date: new Date("2026-07-11T14:20:00"),
// // //     icon: "swap-horizontal-outline",
// // //   },
// // //   {
// // //     id: "5",
// // //     title: "Cashback",
// // //     subtitle: "Reward",
// // //     accountName: "HDFC Credit Card",
// // //     amount: 250,
// // //     type: "income",
// // //     date: new Date("2026-07-10T12:10:00"),
// // //     icon: "gift-outline",
// // //   },
// // // ] as const;

// // // type RecentTransaction = (typeof recentTransactions)[number];

// // // type RecentTransactionRowProps = {
// // //   item: RecentTransaction;
// // //   isLast: boolean;
// // // };

// // // function formatTransactionDate(date: Date) {
// // //   const now = new Date();

// // //   const isToday =
// // //     date.getDate() === now.getDate() &&
// // //     date.getMonth() === now.getMonth() &&
// // //     date.getFullYear() === now.getFullYear();

// // //   const time = new Intl.DateTimeFormat("en-IN", {
// // //     hour: "numeric",
// // //     minute: "2-digit",
// // //   }).format(date);

// // //   if (isToday) {
// // //     return `Today, ${time}`;
// // //   }

// // //   return new Intl.DateTimeFormat("en-IN", {
// // //     day: "numeric",
// // //     month: "short",
// // //     hour: "numeric",
// // //     minute: "2-digit",
// // //   }).format(date);
// // // }

// // // function RecentTransactionRow({ item, isLast }: RecentTransactionRowProps) {
// // //   const isExpense = item.type === "expense";
// // //   const isIncome = item.type === "income";

// // //   const amountPrefix = isExpense ? "−" : isIncome ? "+" : "";

// // //   const amountColor = isExpense
// // //     ? "text-red-500"
// // //     : isIncome
// // //       ? "text-green-600"
// // //       : "text-gray-900";

// // //   const iconBackground = isExpense
// // //     ? "bg-red-50"
// // //     : isIncome
// // //       ? "bg-green-50"
// // //       : "bg-gray-100";

// // //   const iconColor = isExpense ? "#ef4444" : isIncome ? "#16a34a" : "#4b5563";

// // //   return (
// // //     <Pressable
// // //       className={`flex-row items-center py-3 ${
// // //         isLast ? "" : "border-b border-gray-100"
// // //       }`}
// // //       onPress={() => {}}
// // //       android_ripple={{
// // //         color: "#e5e7eb",
// // //         alpha: 0.3,
// // //       }}
// // //     >
// // //       {/* Transaction Icon */}
// // //       <View
// // //         className={`size-11 items-center justify-center rounded-full ${iconBackground}`}
// // //       >
// // //         <Ionicons name={item.icon} size={21} color={iconColor} />
// // //       </View>

// // //       {/* Transaction Details */}
// // //       <View className="ml-3 flex-1">
// // //         <Text
// // //           className="text-base font-semibold text-gray-900"
// // //           numberOfLines={1}
// // //         >
// // //           {item.title}
// // //         </Text>

// // //         <Text className="mt-0.5 text-xs text-gray-500" numberOfLines={1}>
// // //           {item.subtitle} · {item.accountName}
// // //         </Text>
// // //       </View>

// // //       {/* Amount and Date */}
// // //       <View className="ml-3 items-end">
// // //         <Text className={`text-base font-bold ${amountColor}`}>
// // //           {amountPrefix}₹{formatAmount(item.amount)}
// // //         </Text>

// // //         <Text className="mt-0.5 text-xs text-gray-400">
// // //           {formatTransactionDate(item.date)}
// // //         </Text>
// // //       </View>
// // //     </Pressable>
// // //   );
// // // }

// // // // function RecentTransactions() {
// // // //   return (
// // // //     <View className="px-4">
// // // //       {/* Section Header */}
// // // //       <View className="mb-1 flex-row items-center justify-between">
// // // //         <Text className="text-lg font-bold text-gray-900">
// // // //           Recent Transactions
// // // //         </Text>

// // // //         <Pressable onPress={() => {}} hitSlop={8}>
// // // //           <Text className="text-sm font-semibold text-gray-500">View all</Text>
// // // //         </Pressable>
// // // //       </View>

// // // //       {/* Transactions */}
// // // //       <View>
// // // //         {recentTransactions.map((item, index) => (
// // // //           <RecentTransactionRow
// // // //             key={item.id}
// // // //             item={item}
// // // //             isLast={index === recentTransactions.length - 1}
// // // //           />
// // // //         ))}
// // // //       </View>
// // // //     </View>
// // // //   );
// // // // }

// // // function RecentTransactions() {
// // //   return (
// // //     <View className="flex-1 px-4">
// // //       {/* Fixed Header */}
// // //       <View className="mb-1 flex-row items-center justify-between">
// // //         <Text className="text-lg font-bold text-gray-900">
// // //           Recent Transactions
// // //         </Text>

// // //         <Pressable onPress={() => {}} hitSlop={8}>
// // //           <Text className="text-sm font-semibold text-gray-500">View all</Text>
// // //         </Pressable>
// // //       </View>

// // //       {/* Scrollable Items */}
// // //       <FlatList
// // //         data={recentTransactions}
// // //         keyExtractor={(item) => item.id}
// // //         renderItem={({ item, index }) => (
// // //           <RecentTransactionRow
// // //             item={item}
// // //             isLast={index === recentTransactions.length - 1}
// // //           />
// // //         )}
// // //         showsVerticalScrollIndicator={false}
// // //       />
// // //     </View>
// // //   );
// // // }
// // // export default function DashboardScreen() {
// // //   return (
// // //     <SafeAreaView
// // //       style={{
// // //         flex: 1,
// // //         backgroundColor: "white",
// // //       }}
// // //     >
// // //       <View className="px-4 pt-4">
// // //         <Header />
// // //         <ExpenseCard />
// // //       </View>
// // //       <View className="p-5">
// // //         <AccountList />
// // //       </View>
// // //       <RecentTransactions />
// // //     </SafeAreaView>
// // //   );
// // // }
