import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import { Pressable, Text, View, useColorScheme } from "react-native";
import LiveDateTime from "../live-date-time";

export default function DashboardHeader() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const iconColor = colorScheme === "dark" ? "#cbd5e1" : "#64748b";
  const rippleColor =
    colorScheme === "dark"
      ? "rgba(255,255,255,0.12)"
      : "rgba(100,116,139,0.25)";

  return (
    <View className="flex-row items-center justify-between ">
      <View className="flex-1 pr-4">
        <LiveDateTime />

        <Text className="mt-0.5 text-slate-500 dark:text-slate-400">
          Welcome back, Satish!
        </Text>
      </View>
      <Pressable
        className="size-12 items-center justify-center rounded-full border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-900"
        android_ripple={{ color: rippleColor, borderless: false }}
        onPress={() => router.push("/profile")}
      >
        <Ionicons name="person" size={22} color={iconColor} />
      </Pressable>
      {/* <View className="size-12 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <Pressable
          className="flex-1 items-center justify-center"
          android_ripple={{
            color: rippleColor,
            borderless: false,
          }}
          onPress={() => router.push("/profile")}
        >
          <Ionicons name="person" size={24} color={iconColor} />
        </Pressable>
      </View> */}
    </View>
  );
}

// import Ionicons from "@react-native-vector-icons/ionicons";
// import { useRouter } from "expo-router";
// import { Pressable, Text, View } from "react-native";
// import LiveDateTime from "../live-date-time";

// export default function DashboardHeader() {
//   const router = useRouter();

//   return (
//     <View className="flex-row items-center justify-between">
//       <View className="flex-1 pr-4">
//         <LiveDateTime />
//         <Text className="mt-0.5  text-slate-500 dark:text-slate-400">
//           Welcome back, Satish!
//         </Text>
//       </View>

//       <View className="size-12 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
//         <Pressable
//           className="flex-1 items-center justify-center"
//           android_ripple={{
//             color: "rgba(100, 116, 139, 0.25)",
//             borderless: false,
//           }}
//           onPress={() => router.push("/profile")}
//         >
//           <Ionicons name="person" size={24} color="#64748b" />
//         </Pressable>
//       </View>
//     </View>
//   );
// }
