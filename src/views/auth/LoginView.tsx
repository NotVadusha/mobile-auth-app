import { Link } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import AuthCard from "../../components/AuthCard";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  {
    Home: undefined;
    Login: undefined;
  },
  "Login"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const LoginView = ({ navigation }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://192.168.0.119:3000/auth/login",
        {
          username,
          password,
        },
      );
      console.log(response);
      AsyncStorage.setItem("jwtToken", response.data.access_token);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      console.log(error);
      console.warn("Fetch error");
    }
  };

  return (
    <SafeAreaView
      style={{
        gap: 32,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100%",
        backgroundColor: "#1268CC",
      }}
    >
      <AuthCard
        mainHeaderText="Login"
        secondaryHeaderText="Welcome back! Please enter your details."
      >
        <View style={styles.formBody}>
          <View style={styles.inputsBody}>
            <TextInput
              placeholder="Username"
              value={username}
              onValueChange={setUsername}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onValueChange={setPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Button label="Sign in" variant="filled" onPress={handleLogin} />
            <Button label="Forgot password?" variant="outlined" />
          </View>
        </View>
      </AuthCard>
      <Text style={styles.outCardText}>
        Don't have an account?{" "}
        <Link to={"/Register"} style={styles.outCardTextLink}>
          Sign up for free
        </Link>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outCardText: {
    fontSize: 14,
    color: "#D9DFE6",
    textAlign: "center",
    fontFamily: "Noto Sans",
    fontWeight: "500",
  },
  outCardTextLink: { color: "white" },
  cardHeader: {
    paddingHorizontal: 18,
    paddingVertical: 24,
    gap: 18,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  card: {
    marginHorizontal: 24,
    backgroundColor: "white",
    borderRadius: 20,
    shadowRadius: 20,
    shadowColor: "black",
    shadowOpacity: 0.25,
  },
  cardHeaderNameText: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Catamaran",
  },
  cardHeaderBodyText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    fontFamily: "Noto Sans",
    fontWeight: "500",
  },
  formBody: {
    gap: 24,
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
  inputsBody: {
    gap: 26,
  },
  buttonsContainer: {
    display: "flex",
    gap: 8,
  },
});
