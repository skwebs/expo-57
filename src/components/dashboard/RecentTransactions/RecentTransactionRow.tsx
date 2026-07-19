import { formatAmount, formatTransactionDate } from "@/utils/format";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Pressable, Text, View, useColorScheme } from "react-native";
import { RecentTransaction } from "./types";

type Props = {
  item: RecentTransaction;
};

export default function RecentTransactionRow({ item }: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const isExpense = item.type === "expense";
  const isIncome = item.type === "income" || item.type === "refund";

  const amountPrefix = isExpense ? "−" : isIncome ? "+" : "";

  const amountColor = isExpense
    ? "text-red-500 dark:text-red-400"
    : isIncome
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-slate-950 dark:text-slate-50";

  const iconBackground = isExpense
    ? "bg-red-50 dark:bg-red-900/30"
    : isIncome
      ? "bg-emerald-50 dark:bg-emerald-900/30"
      : "bg-slate-100 dark:bg-slate-800";

  const iconColor = isExpense
    ? isDark
      ? "#f87171"
      : "#ef4444"
    : isIncome
      ? isDark
        ? "#34d399"
        : "#059669"
      : isDark
        ? "#cbd5e1"
        : "#475569";

  const rippleColor = isDark
    ? "rgba(255,255,255,0.12)"
    : "rgba(226,232,240,0.6)";

  return (
    <Pressable
      className="flex-row items-center py-3.5"
      onPress={() => {
        // Navigate to transaction details.
      }}
      android_ripple={{
        color: rippleColor,
        borderless: false,
      }}
    >
      {/* Transaction Icon */}
      <View
        className={`size-11 items-center justify-center rounded-full ${iconBackground}`}
      >
        <Ionicons name={item.icon} size={21} color={iconColor} />
      </View>

      {/* Details */}
      <View className="ml-3 min-w-0 flex-1">
        <Text
          className="text-base font-semibold text-slate-950 dark:text-slate-50"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>

        <Text
          className="mt-0.5 text-xs text-slate-500 dark:text-slate-400"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.category} · {item.accountName}
        </Text>
      </View>

      {/* Amount + Date */}
      <View className="ml-3 max-w-[42%] items-end">
        <Text
          className={`text-base font-bold ${amountColor}`}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.8}
        >
          {amountPrefix}₹{formatAmount(item.amount)}
        </Text>

        <Text
          className="mt-0.5 text-xs text-slate-500 dark:text-slate-400"
          numberOfLines={1}
        >
          {formatTransactionDate(item.date)}
        </Text>
      </View>
    </Pressable>
  );
}

// import { formatAmount, formatTransactionDate } from "@/utils/format";
// import Ionicons from "@react-native-vector-icons/ionicons";
// import { Pressable, Text, View } from "react-native";
// import { RecentTransaction } from "./types";

// type Props = {
//   item: RecentTransaction;
// };

// export default function RecentTransactionRow({ item }: Props) {
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
