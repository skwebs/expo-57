import { useKeepAwake } from "expo-keep-awake";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AnimatedSplashOverlay } from "@/components/animated-icon";

import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useKeepAwake();

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <View className="flex-1 bg-white dark:bg-slate-950">
        <StatusBar style={isDark ? "light" : "dark"} />

        {/* Global status bar background */}
        <View
          className="absolute left-0 right-0 top-0 z-50 bg-white/80 dark:bg-slate-950/70"
          style={{ height: insets.top }}
          pointerEvents="none"
        />
        <View
          className="absolute left-0 right-0 bottom-0 z-50 bg-white/80 dark:bg-slate-950/70"
          style={{ height: insets.bottom }}
          pointerEvents="none"
        />

        <AnimatedSplashOverlay />

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: isDark ? "#020617" : "#ffffff",
            },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="profile" />
        </Stack>
      </View>
    </ThemeProvider>
  );
}

// import { useKeepAwake } from "expo-keep-awake";
// import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useColorScheme } from "react-native";

// import { AnimatedSplashOverlay } from "@/components/animated-icon";

// import { StatusBar } from "expo-status-bar";
// import "../global.css";

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   useKeepAwake();

//   const colorScheme = useColorScheme();
//   const isDark = colorScheme === "dark";

//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <StatusBar style={isDark ? "light" : "dark"} />
//       <AnimatedSplashOverlay />

//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="(tabs)" />
//         <Stack.Screen name="profile" />
//       </Stack>
//     </ThemeProvider>
//   );
// }
// // import { useKeepAwake } from "expo-keep-awake";
// // import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
// // import * as SplashScreen from "expo-splash-screen";
// // import { useColorScheme } from "react-native";
// // import "./../global.css";

// // import { AnimatedSplashOverlay } from "@/components/animated-icon";
// // import AppTabs from "@/components/app-tabs";

// // SplashScreen.preventAutoHideAsync();

// // export default function TabLayout() {
// //   useKeepAwake();
// //   const colorScheme = useColorScheme();
// //   return (
// //     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
// //       <AnimatedSplashOverlay />
// //       <AppTabs />
// //     </ThemeProvider>
// //   );
// // }
