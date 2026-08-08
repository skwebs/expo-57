import { Pressable, Text, View } from "react-native";

export default function RecentTransactionsHeader() {
  return (
    <View className="mt-5 flex-row items-center justify-between">
      <Text className="text-lg font-bold text-slate-950">
        Recent Transactions
      </Text>

      <Pressable
        onPress={() => {
          // Navigate to transactions screen.
        }}
        hitSlop={8}
      >
        <Text className="text-sm font-semibold text-blue-600">View all</Text>
      </Pressable>
    </View>
  );
}
