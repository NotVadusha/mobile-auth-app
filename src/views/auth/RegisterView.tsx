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
    Register: undefined;
  },
  "Register"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const SignUpView = ({ navigation }: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [initialPassword, setInitialPassword] = useState("");
  const [password, setPassword] = useState("");

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
        mainHeaderText="Sign up"
        secondaryHeaderText="Hello there! Let's create your account."
      >
        <View style={styles.formBody}>
          <View style={styles.inputsBody}>
            <TextInput
              placeholder="Username"
              value={username}
              onValueChange={setUsername}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onValueChange={setEmail}
            />
            <TextInput
              placeholder="Password"
              value={initialPassword}
              onValueChange={setInitialPassword}
              secureTextEntry
            />
            <TextInput
              placeholder="Repeat password"
              value={password}
              onValueChange={setPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              label="Create account"
              variant="filled"
              onPress={() => {}}
            />
          </View>
        </View>
      </AuthCard>
      <Text style={styles.outCardText}>
        Already have an account?{" "}
        <Link to={"/Login"} style={styles.outCardTextLink}>
          Login
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
