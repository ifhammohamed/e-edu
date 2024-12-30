import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import LoginScreen from "./pages/LoginScreen.js";
import RegisterScreen from "./pages/RegisterScreen";
import HomeScreen from "./pages/HomeScreen";
import DetailScreen from "./components/DetailScreen.js";
import { TouchCountProvider } from "./context/TouchCountContext.js";
import { UserProvider, useUser } from "./context/UserContext";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

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

const HeaderRight = () => {
  const { userEmail } = useUser();
  console.log("🚀 ~ HeaderRight ~ userEmail:", userEmail);
  return (
    <View style={{ marginRight: 10 }}>
      <Text style={{ color: theme.colors.primary, fontSize: 14 }}>
        {userEmail}
      </Text>
    </View>
  );
};

export default function App() {
  return (
    <UserProvider>
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
                },
                headerStyle: {
                  backgroundColor: theme.colors.background,
                },
              }}
            >
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  title: "E EDU Home",
                  headerRight: () => <HeaderRight />,
                }}
              />
              <Stack.Screen name="Detail" component={DetailScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </TouchCountProvider>
    </UserProvider>
  );
}
