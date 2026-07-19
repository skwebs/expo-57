import { formatAmount } from "@/utils/format";
import Ionicons from "@react-native-vector-icons/ionicons";
import {
  FlatList,
  Pressable,
  Text,
  View,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { ACCOUNT_CARD_GAP, SCREEN_HORIZONTAL_PADDING } from "./constants";
import { accountItems } from "./data";
import { AccountItem } from "./types";

type AccountCardProps = {
  item: AccountItem;
  width: number;
};

function AccountCard({ item, width }: AccountCardProps) {
  const isDark = useColorScheme() === "dark";

  const isLiability = item.balanceType === "liability";
  const isReceivable = item.balanceType === "receivable";

  const iconColor = isLiability
    ? isDark
      ? "#f87171"
      : "#ef4444"
    : isReceivable || item.id === "cash"
      ? isDark
        ? "#34d399"
        : "#059669"
      : isDark
        ? "#cbd5e1"
        : "#475569";

  const iconBackground = isLiability
    ? "bg-red-50 dark:bg-red-900/30"
    : isReceivable || item.id === "cash"
      ? "bg-emerald-50 dark:bg-emerald-900/30"
      : "bg-slate-100 dark:bg-slate-800";

  const amountColor = isLiability
    ? "text-red-500 dark:text-red-400"
    : isReceivable
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-slate-950 dark:text-slate-50";

  const rippleColor = isDark
    ? "rgba(255,255,255,0.12)"
    : "rgba(226,232,240,0.6)";

  return (
    <Pressable
      style={{ width }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900"
      onPress={() => {
        // Navigate to corresponding account screen here.
      }}
      android_ripple={{
        color: rippleColor,
        borderless: false,
      }}
    >
      <View
        className={`size-11 items-center justify-center rounded-full ${iconBackground}`}
      >
        <Ionicons name={item.icon} size={22} color={iconColor} />
      </View>

      <Text
        className="mt-3 text-xs font-bold uppercase text-slate-600 dark:text-slate-400"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.name}
      </Text>

      <Text
        className={`mt-1 text-base font-bold ${amountColor}`}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.8}
      >
        ₹{formatAmount(item.amount)}
      </Text>

      <View className="mt-3 items-end">
        <Ionicons
          name="chevron-forward"
          size={18}
          color={isDark ? "#cbd5e1" : "#64748b"}
        />
      </View>
    </Pressable>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Accounts Overview                              */
/* -------------------------------------------------------------------------- */

export default function AccountsOverview() {
  const { width: screenWidth } = useWindowDimensions();

  /*
   * Displays approximately 2.7 cards on a standard phone.
   * Minimum width prevents cards from becoming too narrow on small phones.
   */
  const availableWidth = screenWidth - SCREEN_HORIZONTAL_PADDING * 2;

  const cardWidth = Math.max(
    112,
    (availableWidth - ACCOUNT_CARD_GAP * 2) / 2.7,
  );

  return (
    <View className="mt-5">
      {/* Section Header */}
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-slate-950 dark:text-slate-50">
          Accounts Overview
        </Text>

        <Pressable
          onPress={() => {
            // Navigate to all accounts screen.
          }}
          hitSlop={8}
        >
          <Text className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            View all
          </Text>
        </Pressable>
      </View>

      {/* Horizontal Carousel */}
      <FlatList
        horizontal
        data={accountItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AccountCard item={item} width={cardWidth} />}
        ItemSeparatorComponent={() => (
          <View style={{ width: ACCOUNT_CARD_GAP }} />
        )}
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth + ACCOUNT_CARD_GAP}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
      />
    </View>
  );
}
// import { formatAmount } from "@/utils/format";
// import Ionicons from "@react-native-vector-icons/ionicons";
// import {
//   FlatList,
//   Pressable,
//   Text,
//   useWindowDimensions,
//   View,
// } from "react-native";
// import { ACCOUNT_CARD_GAP, SCREEN_HORIZONTAL_PADDING } from "./constants";
// import { accountItems } from "./data";
// import { AccountItem } from "./types";

// type AccountCardProps = {
//   item: AccountItem;
//   width: number;
// };

// function AccountCard({ item, width }: AccountCardProps) {
//   const isLiability = item.balanceType === "liability";
//   const isReceivable = item.balanceType === "receivable";

//   const iconColor = isLiability
//     ? "#ef4444"
//     : isReceivable
//       ? "#059669"
//       : item.id === "cash"
//         ? "#059669"
//         : "#475569";

//   const iconBackground = isLiability
//     ? "bg-red-50"
//     : isReceivable || item.id === "cash"
//       ? "bg-emerald-50"
//       : "bg-slate-100";

//   const amountColor = isLiability
//     ? "text-red-500"
//     : isReceivable
//       ? "text-emerald-600"
//       : "text-slate-950";

//   return (
//     <Pressable
//       style={{ width }}
//       className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3"
//       onPress={() => {
//         // Navigate to corresponding account screen here.
//       }}
//       android_ripple={{
//         color: "#e2e8f0",
//         alpha: 0.3,
//       }}
//     >
//       <View
//         className={`size-11 items-center justify-center rounded-full ${iconBackground}`}
//       >
//         <Ionicons name={item.icon} size={22} color={iconColor} />
//       </View>

//       <Text
//         className="mt-3 text-xs font-bold uppercase text-slate-600"
//         numberOfLines={1}
//         ellipsizeMode="tail"
//       >
//         {item.name}
//       </Text>

//       <Text
//         className={`mt-1 text-base font-bold ${amountColor}`}
//         numberOfLines={1}
//         adjustsFontSizeToFit
//         minimumFontScale={0.8}
//       >
//         ₹{formatAmount(item.amount)}
//       </Text>

//       <View className="mt-3 items-end">
//         <Ionicons name="chevron-forward" size={18} color="#64748b" />
//       </View>
//     </Pressable>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                             Accounts Overview                              */
// /* -------------------------------------------------------------------------- */

// export default function AccountsOverview() {
//   const { width: screenWidth } = useWindowDimensions();

//   /*
//    * Displays approximately 2.7 cards on a standard phone.
//    * Minimum width prevents cards from becoming too narrow on small phones.
//    */
//   const availableWidth = screenWidth - SCREEN_HORIZONTAL_PADDING * 2;

//   const cardWidth = Math.max(
//     112,
//     (availableWidth - ACCOUNT_CARD_GAP * 2) / 2.7,
//   );

//   return (
//     <View className="mt-5">
//       {/* Section Header */}
//       <View className="mb-3 flex-row items-center justify-between">
//         <Text className="text-lg font-bold text-slate-950">
//           Accounts Overview
//         </Text>

//         <Pressable
//           onPress={() => {
//             // Navigate to all accounts screen.
//           }}
//           hitSlop={8}
//         >
//           <Text className="text-sm font-semibold text-blue-600">View all</Text>
//         </Pressable>
//       </View>

//       {/* Horizontal Carousel */}
//       <FlatList
//         horizontal
//         data={accountItems}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <AccountCard item={item} width={cardWidth} />}
//         ItemSeparatorComponent={() => (
//           <View style={{ width: ACCOUNT_CARD_GAP }} />
//         )}
//         showsHorizontalScrollIndicator={false}
//         snapToInterval={cardWidth + ACCOUNT_CARD_GAP}
//         snapToAlignment="start"
//         decelerationRate="fast"
//         disableIntervalMomentum
//       />
//     </View>
//   );
// }
