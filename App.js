import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import LoginScreen from "./pages/LoginScreen.js";
import RegisterScreen from "./pages/RegisterScreen";
import HomeScreen from "./pages/HomeScreen";
import DetailScreen from "./components/DetailScreen.js";
import { TouchCountProvider } from "./context/TouchCountContext.js";

const Stack = createNativeStackNavigator();

// Define a custom theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#5A4AF4",
    accent: "#1EA5FC",
    background: "#f5f5f5",
    text: "#333333",
    surface: "#ffffff",
    placeholder: "#888888",
  },
};

export default function App() {
  return (
    <TouchCountProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: theme.colors.primary,
                backgroundColor: theme.colors.background,
              },
              headerStyle: {
                backgroundColor: theme.colors.background,
              },
            }}
          >
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "E EDU Login" }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "E EDU Home" }}
            />
            <Stack.Screen name="Detail" component={DetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </TouchCountProvider>
  );
}
