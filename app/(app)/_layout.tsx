import React from "react";
import { Redirect, Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";

const BOTTOM_TAB_HEIGHT = 50;

export default function TabLayout() {
  const { isAuthenticated } = useAuth();
  const safeAreaInsets = useSafeAreaInsets();
  const bottomTabHeight = BOTTOM_TAB_HEIGHT + safeAreaInsets.bottom;

  const screenOptions = {
    tabBarActiveTintColor: Colors.primary,
    tabBarInactiveTintColor: Colors.neutralDark,
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      borderTopColor: Colors.neutralDark,
      height: bottomTabHeight,
      paddingTop:
        safeAreaInsets.bottom > 0 ? safeAreaInsets.bottom / 2 - 10 : 0,
    },
  };
  interface BottomTab {
    name: string;
    title: string;
    icon: "home" | "person-sharp";
    size: number;
  }

  const tabs: BottomTab[] = [
    {
      name: "index",
      title: "Home",
      icon: "home",
      size: 20,
    },
    {
      name: "profile",
      title: "Profile",
      icon: "person-sharp",
      size: 20,
    },
  ];

  // if (!isAuthenticated) {
  //   return <Redirect href="/sign-in" />;
  // }

  return (
    <Tabs screenOptions={screenOptions}>
      {tabs.map(({ name, title, icon, size }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }) => (
              <Ionicons name={icon} color={color} size={size} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
