import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomNavigator from "./navigation/BottomNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <BottomNavigator />
    </NavigationContainer>
  );
}
