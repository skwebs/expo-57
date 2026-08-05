import { Platform, Text, View } from "react-native";

type CreditCardsHeaderProps = {
  totalOutstanding: number;
  currentCycleSpend: number;
  activeCards: number;
  billsDue: number;
};

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);

const textStyle =
  Platform.OS === "android"
    ? {
        includeFontPadding: false,
      }
    : undefined;

export default function CreditCardsHeader({
  totalOutstanding,
  currentCycleSpend,
  activeCards,
  billsDue,
}: CreditCardsHeaderProps) {
  return (
    <View className="flex-row border-b border-slate-200 bg-amber-50 py-3 pt-safe">
      {/* Left */}
      <View className="flex-1 items-center">
        <View className="flex-row items-center gap-1">
          <Text
            allowFontScaling={false}
            style={[textStyle, { lineHeight: 18 }]}
            className="text-sm font-medium text-slate-500"
          >
            TOTAL DUE
          </Text>

          <View className="min-w-6 items-center rounded-full bg-red-500 px-2 py-0.5">
            <Text
              allowFontScaling={false}
              style={[textStyle, { lineHeight: 14 }]}
              className="text-xs font-semibold text-white"
            >
              {billsDue}
            </Text>
          </View>
        </View>

        <Text
          allowFontScaling={false}
          style={[textStyle, { lineHeight: 38 }]}
          className="mt-2 text-3xl font-bold text-red-600"
        >
          ₹{formatAmount(totalOutstanding)}
        </Text>
      </View>

      {/* Right */}
      <View className="flex-1 items-center">
        <Text
          allowFontScaling={false}
          style={[textStyle, { lineHeight: 18 }]}
          className="text-sm font-medium text-slate-500"
        >
          RECENT SPEND
        </Text>

        <Text
          allowFontScaling={false}
          style={[textStyle, { lineHeight: 38 }]}
          className="mt-2 text-3xl font-bold text-slate-900"
        >
          ₹{formatAmount(currentCycleSpend)}
        </Text>
      </View>
    </View>
  );
}
// import { Text, View } from "react-native";

// type CreditCardsHeaderProps = {
//   totalOutstanding: number;
//   currentCycleSpend: number;
//   activeCards: number;
//   billsDue: number;
// };

// const formatAmount = (amount: number) =>
//   new Intl.NumberFormat("en-IN", {
//     maximumFractionDigits: 0,
//   }).format(amount);

// function SummaryItem({
//   label,
//   value,
// }: {
//   label: string;
//   value: string | number;
// }) {
//   return (
//     <View className="flex-1 bg-amber-100">
//       <Text className="text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
//         {label}
//       </Text>

//       <Text
//         className="mt-1 text-base font-bold text-slate-950 dark:text-slate-50"
//         numberOfLines={1}
//       >
//         {value}
//       </Text>
//     </View>
//   );
// }

// export default function CreditCardsHeader({
//   totalOutstanding,
//   currentCycleSpend,
//   activeCards,
//   billsDue,
// }: CreditCardsHeaderProps) {
//   return (
//     <>
//       <View className="flex-row items-center justify-evenly border-b border-slate-200 bg-amber-50 py-2 pt-safe">
//         <View className="items-center">
//           <View className="flex-row items-center gap-1">
//             <Text className="text-sm font-medium text-slate-500">
//               TOTAL DUE
//             </Text>

//             <View className="rounded-full bg-red-500 px-2 py-0.5">
//               <Text className="text-xs font-semibold text-white">
//                 {billsDue}
//               </Text>
//             </View>
//           </View>

//           <Text className="mt-2 text-3xl font-bold text-red-600">
//             ₹{formatAmount(totalOutstanding)}
//           </Text>
//         </View>

//         <View className="items-center">
//           <Text className="text-sm font-medium text-slate-500">
//             RECENT SPEND
//           </Text>

//           <Text className="mt-2 text-3xl font-bold text-slate-900">
//             ₹{formatAmount(currentCycleSpend)}
//           </Text>
//         </View>
//       </View>
//       {/* <View className="flex-row border-b border-slate-200">
//         <View className="w-1/2 items-center bg-amber-50 py-4">
//           <View className="flex-row items-center gap-1">
//             <Text className="text-sm font-medium text-slate-500 dark:text-slate-400">
//               TOTAL DUE
//             </Text>

//             <View className="rounded-full bg-red-500 px-2 py-0.5">
//               <Text className="text-xs font-semibold text-white">
//                 {billsDue}
//               </Text>
//             </View>
//           </View>

//           <Text className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
//             ₹{formatAmount(totalOutstanding)}
//           </Text>
//         </View>

//         <View className="w-1/2 items-center bg-green-50 py-4">
//           <Text className="text-sm font-medium text-slate-500 dark:text-slate-400">
//             RECENT SPEND
//           </Text>

//           <Text className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">
//             ₹{formatAmount(currentCycleSpend)}
//           </Text>
//         </View>
//       </View> */}
//     </>
//   );
// }
