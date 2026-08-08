import { formatWholeAmount } from "@/utils/format";
import { Text, View } from "react-native";
import BudgetStat from "./BudgetStat";
import { TOTAL_BUDGET, USED_BUDGET } from "./constants";
import { calculateBudgetSummary } from "./utils";

export default function BudgetOverviewCard() {
  const {
    remainingBudget,
    rawUsedPercent,
    progressPercent,
    remainingPercent,
    remainingDays,
    dailySafeSpend,
  } = calculateBudgetSummary(USED_BUDGET, TOTAL_BUDGET);

  return (
    <View className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      {/* Top Label */}
      <Text className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Monthly Budget
      </Text>

      {/* Title + Budget Amount */}
      <View className="mt-1 flex-row items-center justify-between gap-3">
        <Text className="flex-1 text-xl font-bold text-slate-950 dark:text-slate-50">
          Budget Overview
        </Text>

        <View className="flex-row items-baseline">
          <Text className="text-base font-bold text-red-500 dark:text-red-400">
            ₹{formatWholeAmount(USED_BUDGET)}
          </Text>

          <Text className="mx-1 text-sm text-slate-400 dark:text-slate-500">
            /
          </Text>

          <Text className="text-base font-bold text-emerald-600 dark:text-emerald-400">
            ₹{formatWholeAmount(TOTAL_BUDGET)}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <View
          className="h-full rounded-full bg-red-500 dark:bg-red-400"
          style={{
            width: `${progressPercent}%`,
          }}
        />
      </View>

      {/* Progress Labels */}
      <View className="mt-2 flex-row items-center justify-between">
        <Text className="text-xs font-semibold text-red-500 dark:text-red-400">
          {rawUsedPercent.toFixed(0)}% of budget used
        </Text>

        <Text className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          {remainingPercent.toFixed(0)}% Remaining
        </Text>
      </View>

      {/* Statistics */}
      <View className="mt-5 flex-row">
        <BudgetStat
          label="Remaining"
          value={`₹${formatWholeAmount(remainingBudget)}`}
          icon="wallet-outline"
          tone="green"
        />

        <BudgetStat
          label="Days left"
          value={remainingDays.toString()}
          icon="calendar-outline"
          tone="neutral"
          showDivider
        />

        <BudgetStat
          label="Safe / day"
          value={`₹${formatWholeAmount(dailySafeSpend)}`}
          icon="shield-checkmark-outline"
          tone="blue"
          showDivider
        />

        <BudgetStat
          label="Spent"
          value={`₹${formatWholeAmount(USED_BUDGET)}`}
          icon="pie-chart-outline"
          tone="red"
          showDivider
        />
      </View>
    </View>
  );
}

// import { formatWholeAmount } from "@/utils/format";
// import { Text, View } from "react-native";
// import BudgetStat from "./BudgetStat";
// import { TOTAL_BUDGET, USED_BUDGET } from "./constants";
// import { calculateBudgetSummary } from "./utils";

// /* -------------------------------------------------------------------------- */
// /*                                  Mock Data                                 */
// /* -------------------------------------------------------------------------- */
// /*
//  * Replace these values with your real SQLite/API/store data when available.
// //  */
// // const usedBudget = 32_000;
// // const totalBudget = 50_000;

// /* -------------------------------------------------------------------------- */
// /*                                  Utilities                                 */
// /* -------------------------------------------------------------------------- */

// export default function BudgetOverviewCard() {
//   const {
//     remainingBudget,
//     rawUsedPercent,
//     progressPercent,
//     remainingPercent,
//     remainingDays,
//     dailySafeSpend,
//   } = calculateBudgetSummary(USED_BUDGET, TOTAL_BUDGET);
//   // const remainingBudget = Math.max(totalBudget - usedBudget, 0);

//   // const rawUsedPercent = totalBudget > 0 ? (usedBudget / totalBudget) * 100 : 0;

//   // const progressPercent = Math.min(Math.max(rawUsedPercent, 0), 100);

//   // const remainingPercent =
//   //   totalBudget > 0 ? Math.max(100 - rawUsedPercent, 0) : 0;

//   // const now = new Date();

//   // const lastDayOfMonth = new Date(
//   //   now.getFullYear(),
//   //   now.getMonth() + 1,
//   //   0,
//   // ).getDate();

//   // Includes today as an available spending day.
//   // const remainingDays = Math.max(lastDayOfMonth - now.getDate(), 0);

//   // const dailySafeSpend =
//   //   remainingDays > 0 ? remainingBudget / remainingDays : 0;

//   return (
//     <View className="mt-5 rounded-2xl border border-slate-200  p-4">
//       {/* Top Label */}
//       <Text className="text-xs font-semibold uppercase tracking-wide text-slate-500">
//         Monthly Budget
//       </Text>

//       {/* Title + Budget Amount */}
//       <View className="mt-1 flex-row items-center justify-between gap-3">
//         <Text className="flex-1 text-xl font-bold text-slate-950">
//           Budget Overview
//         </Text>

//         <View className="flex-row items-baseline">
//           <Text className="text-base font-bold text-red-500">
//             ₹{formatWholeAmount(USED_BUDGET)}
//           </Text>

//           <Text className="mx-1 text-sm text-slate-400">/</Text>

//           <Text className="text-base font-bold text-emerald-600">
//             ₹{formatWholeAmount(TOTAL_BUDGET)}
//           </Text>
//         </View>
//       </View>

//       {/* Progress Bar */}
//       <View className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-200">
//         <View
//           className="h-full rounded-full bg-red-500"
//           style={{
//             width: `${progressPercent}%`,
//           }}
//         />
//       </View>

//       {/* Progress Labels */}
//       <View className="mt-2 flex-row items-center justify-between">
//         <Text className="text-xs font-semibold text-red-500">
//           {rawUsedPercent.toFixed(0)}% of budget used
//         </Text>

//         <Text className="text-xs font-semibold text-emerald-600">
//           {remainingPercent.toFixed(0)}% Remaining
//         </Text>
//       </View>

//       {/* Statistics */}
//       <View className="mt-5 flex-row">
//         <BudgetStat
//           label="Remaining"
//           value={`₹${formatWholeAmount(remainingBudget)}`}
//           icon="wallet-outline"
//           tone="green"
//         />

//         <BudgetStat
//           label="Days left"
//           value={remainingDays.toString()}
//           icon="calendar-outline"
//           tone="neutral"
//           showDivider
//         />

//         <BudgetStat
//           label="Safe / day"
//           value={`₹${formatWholeAmount(dailySafeSpend)}`}
//           icon="shield-checkmark-outline"
//           tone="blue"
//           showDivider
//         />

//         <BudgetStat
//           label="Spent"
//           value={`₹${formatWholeAmount(USED_BUDGET)}`}
//           icon="pie-chart-outline"
//           tone="red"
//           showDivider
//         />
//       </View>
//     </View>
//   );
// }
