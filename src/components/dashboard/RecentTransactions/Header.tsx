import { Pressable, Text, View } from "react-native";

export default function Header() {
  return (
    <View className="mt-5 flex-row items-center justify-between">
      <Text className="text-lg font-bold text-slate-950 dark:text-slate-50">
        Recent Transactions
      </Text>

      <Pressable hitSlop={8}>
        <Text className="text-sm font-semibold text-blue-600 dark:text-blue-400">
          View all
        </Text>
      </Pressable>
    </View>
  );
}
// import { Pressable, Text, View } from "react-native";

// export default function Header() {
//   return (
//     <View className="mt-5 flex-row items-center justify-between">
//       <Text className="text-lg font-bold text-slate-950">
//         Recent Transactions
//       </Text>

//       <Pressable hitSlop={8}>
//         <Text className="text-sm font-semibold text-blue-600">View all</Text>
//       </Pressable>
//     </View>
//   );
// }
