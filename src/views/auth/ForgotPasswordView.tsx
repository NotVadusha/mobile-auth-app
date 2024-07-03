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
    ForgotPassword: undefined;
    ValidateReset: undefined;
  },
  "ForgotPassword"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const ForgotPasswordView = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");

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
        mainHeaderText="Forgot password?"
        secondaryHeaderText="Please, enter email associated with your account."
      >
        <View style={styles.formBody}>
          <View style={styles.inputsBody}>
            <TextInput
              placeholder="Email"
              value={email}
              onValueChange={setEmail}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              label="Submit"
              variant="filled"
              onPress={() => {
                navigation.navigate("ValidateReset");
              }}
            />
          </View>
        </View>
      </AuthCard>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
