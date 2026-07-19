import Ionicons from "@react-native-vector-icons/ionicons";
import { Text, View, useColorScheme } from "react-native";

type BudgetStatProps = {
  label: string;
  value: string;
  icon:
    | "wallet-outline"
    | "calendar-outline"
    | "shield-checkmark-outline"
    | "pie-chart-outline";
  tone: "green" | "neutral" | "blue" | "red";
  showDivider?: boolean;
};

export default function BudgetStat({
  label,
  value,
  icon,
  tone,
  showDivider = false,
}: BudgetStatProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const toneStyles = {
    green: {
      text: "text-emerald-600 dark:text-emerald-400",
      background: "bg-emerald-50 dark:bg-emerald-900/30",
      iconColor: isDark ? "#34d399" : "#059669",
    },
    neutral: {
      text: "text-slate-900 dark:text-slate-100",
      background: "bg-slate-100 dark:bg-slate-800",
      iconColor: isDark ? "#cbd5e1" : "#475569",
    },
    blue: {
      text: "text-blue-600 dark:text-blue-400",
      background: "bg-blue-50 dark:bg-blue-900/30",
      iconColor: isDark ? "#60a5fa" : "#2563eb",
    },
    red: {
      text: "text-red-500 dark:text-red-400",
      background: "bg-red-50 dark:bg-red-900/30",
      iconColor: isDark ? "#f87171" : "#ef4444",
    },
  } as const;

  const colors = toneStyles[tone];

  return (
    <View
      className={`flex-1 items-center px-1 ${
        showDivider ? "border-l border-slate-200 dark:border-slate-700" : ""
      }`}
    >
      <Text
        className="text-center text-xs text-slate-500 dark:text-slate-400"
        numberOfLines={1}
      >
        {label}
      </Text>

      <Text
        className={`mt-1 text-center text-sm font-bold ${colors.text}`}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.8}
      >
        {value}
      </Text>

      <View
        className={`mt-2 size-8 items-center justify-center rounded-full ${colors.background}`}
      >
        <Ionicons name={icon} size={17} color={colors.iconColor} />
      </View>
    </View>
  );
}
// import Ionicons from "@react-native-vector-icons/ionicons";
// import { Text, View } from "react-native";

// type BudgetStatProps = {
//   label: string;
//   value: string;
//   icon:
//     | "wallet-outline"
//     | "calendar-outline"
//     | "shield-checkmark-outline"
//     | "pie-chart-outline";
//   tone: "green" | "neutral" | "blue" | "red";
//   showDivider?: boolean;
// };

// export default function BudgetStat({
//   label,
//   value,
//   icon,
//   tone,
//   showDivider = false,
// }: BudgetStatProps) {
//   const toneStyles = {
//     green: {
//       text: "text-emerald-600",
//       background: "bg-emerald-50",
//       iconColor: "#059669",
//     },
//     neutral: {
//       text: "text-slate-900",
//       background: "bg-slate-100",
//       iconColor: "#475569",
//     },
//     blue: {
//       text: "text-blue-600",
//       background: "bg-blue-50",
//       iconColor: "#2563eb",
//     },
//     red: {
//       text: "text-red-500",
//       background: "bg-red-50",
//       iconColor: "#ef4444",
//     },
//   } as const;

//   const colors = toneStyles[tone];

//   return (
//     <View
//       className={`flex-1 items-center px-1 ${
//         showDivider ? "border-l border-slate-200" : ""
//       }`}
//     >
//       <Text className="text-center text-xs text-slate-500" numberOfLines={1}>
//         {label}
//       </Text>

//       <Text
//         className={`mt-1 text-center text-sm font-bold ${colors.text}`}
//         numberOfLines={1}
//         adjustsFontSizeToFit
//         minimumFontScale={0.8}
//       >
//         {value}
//       </Text>

//       <View
//         className={`mt-2 size-8 items-center justify-center rounded-full ${colors.background}`}
//       >
//         <Ionicons name={icon} size={17} color={colors.iconColor} />
//       </View>
//     </View>
//   );
// }
