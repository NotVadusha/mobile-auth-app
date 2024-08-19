import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootStack from "app/src/router/RootStack";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";

const queryClient = new QueryClient();

const linking = {
  prefixes: ["authapp://"],
};

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer
          linking={linking}
          fallback={<ActivityIndicator color="blue" size="large" />}
        >
          <RootStack />
        </NavigationContainer>
      </QueryClientProvider>
      <Toast />
    </>
  );
}
