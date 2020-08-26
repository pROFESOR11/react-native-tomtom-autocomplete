import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Basic } from "../screens/Basic";
import { WithMap } from "../screens/WithMap";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Basic") {
            iconName = focused ? "information" : "information-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        labelStyle: { fontSize: 15 },
      }}
    >
      <Tab.Screen name="Basic" component={Basic} />
      <Tab.Screen name="Map" component={WithMap} />
    </Tab.Navigator>
  );
}
