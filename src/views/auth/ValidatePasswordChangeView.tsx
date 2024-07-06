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

export const ValidatePasswordChangeView = ({ navigation }: Props) => {
  const [code, setCode] = useState("");

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
        mainHeaderText="Code validation"
        secondaryHeaderText="Please enter the 4 digit code sent to your email"
      >
        <View style={styles.formBody}>
          <View style={styles.inputsBody}>
            <TextInput
              placeholder="Enter code"
              value={code}
              keyboardType="decimal-pad"
              textContentType="oneTimeCode"
              onValueChange={setCode}
            />
            <Text style={styles.outCardText}>
              Didn't get the code?{" "}
              <Link to={"/Login"} style={styles.outCardTextLink}>
                Resend code
              </Link>
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <Button label="Submit" variant="filled" onPress={() => {}} />
          </View>
        </View>
      </AuthCard>
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
