import { Text, View } from "react-native";

import type { CreditCard } from "./types";

type Props = {
  card: CreditCard;
};

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);

function StatusBadge({ status }: { status: CreditCard["paymentStatus"] }) {
  const styles = {
    paid: {
      bg: "bg-green-100 dark:bg-green-950",
      text: "text-green-700 dark:text-green-300",
      label: "Paid",
    },
    partial: {
      bg: "bg-amber-100 dark:bg-amber-950",
      text: "text-amber-700 dark:text-amber-300",
      label: "Partial",
    },
    due: {
      bg: "bg-red-100 dark:bg-red-950",
      text: "text-red-700 dark:text-red-300",
      label: "Due",
    },
  }[status];

  return (
    <View className={`rounded-full px-3 py-1 ${styles.bg}`}>
      <Text className={`text-xs font-semibold ${styles.text}`}>
        {styles.label}
      </Text>
    </View>
  );
}

export default function CreditCardItem({ card }: Props) {
  return (
    <View className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-slate-900 dark:text-white">
            {card.cardName}
          </Text>

          <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {card.bankName} •••• {card.last4}
          </Text>
        </View>

        <StatusBadge status={card.paymentStatus} />
      </View>

      {/* Billing Cycle */}
      <View className="mt-5 flex-row justify-between">
        <View>
          <Text className="text-xs text-slate-500 dark:text-slate-400">
            Billing Cycle
          </Text>

          <Text className="mt-1 font-medium text-slate-900 dark:text-white">
            {card.billingCycleStart} → {card.billingCycleEnd}
          </Text>
        </View>

        <View className="items-end">
          <Text className="text-xs text-slate-500 dark:text-slate-400">
            Statement In
          </Text>

          <Text className="mt-1 font-medium text-slate-900 dark:text-white">
            {card.statementInDays} days
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View className="my-4 h-px bg-slate-200 dark:bg-slate-800" />

      {/* Amounts */}
      <View className="flex-row justify-between">
        <View>
          <Text className="text-xs text-slate-500 dark:text-slate-400">
            Current Spend
          </Text>

          <Text className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
            ₹{formatAmount(card.currentCycleSpend)}
          </Text>
        </View>

        <View className="items-end">
          <Text className="text-xs text-slate-500 dark:text-slate-400">
            Previous Bill
          </Text>

          <Text className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
            ₹{formatAmount(card.previousStatementAmount)}
          </Text>
        </View>
      </View>

      <View className="mt-5 flex-row justify-between">
        <View>
          <Text className="text-xs text-slate-500 dark:text-slate-400">
            Remaining Due
          </Text>

          <Text className="mt-1 text-lg font-bold text-red-600 dark:text-red-400">
            ₹{formatAmount(card.remainingDueAmount)}
          </Text>
        </View>

        <View className="items-end">
          <Text className="text-xs text-slate-500 dark:text-slate-400">
            Due Date
          </Text>

          <Text className="mt-1 font-semibold text-slate-900 dark:text-white">
            {card.dueDate}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View className="mt-5 rounded-xl bg-slate-100 px-3 py-3 dark:bg-slate-800">
        <Text className="text-xs text-slate-500 dark:text-slate-400">
          Last Payment
        </Text>

        {card.lastPaymentDate ? (
          <Text className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
            ₹{formatAmount(card.lastPaymentAmount)} • {card.lastPaymentDate}
          </Text>
        ) : (
          <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            No payment recorded
          </Text>
        )}
      </View>
    </View>
  );
}
