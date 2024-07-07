import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { RootStackParamList } from "./router.types";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";
import useAuthStore from "../store/AuthStore";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const { access_token, isLoading, setDetailsFromStore } = useAuthStore();

  useEffect(() => {
    setDetailsFromStore();
  }, []);

  return (
    <>
      {isLoading ? (
        <View>
          <Text>loading</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Stack.Navigator>
            {access_token ? (
              <Stack.Screen
                options={{ headerShown: false }}
                name={"HomeStackScreen"}
                component={HomeStack}
              />
            ) : (
              <Stack.Screen
                options={{ headerShown: false, headerTransparent: true }}
                name={"AuthStackScreen"}
                component={AuthStack}
              />
            )}
          </Stack.Navigator>
        </View>
      )}
    </>
  );
};

export default RootStack;
