import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Link } from "@react-navigation/native";
import { registerValidationSchema } from "../../utils/validationSchemas/registerValidationSchema";
import ControlledInput from "../../components/FormControl/FormControlTextInput";
import AuthCard from "../../components/AuthCard";
import Button from "../../components/Button";
import { Form, useForm } from "react-hook-form";
import { AuthStackParamList } from "../../router/router.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuthStore from "../../store/AuthStore";
import { checkEmail, checkName, register } from "../../services/auth.service";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Register"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

type FormValues = {
  Username: string;
  Email: string;
  Password: string;
  RepeatedPassword: string;
};

export const SignUpView = ({ navigation }: Props) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: async (data, context, options) => {
      console.log(context);
      return yupResolver(registerValidationSchema)(data, context, options);
    },
  });
  const [isFetching, setIsFetching] = useState(false);

  const { login: loginInStore } = useAuthStore();

  const handleRegister = async () => {
    try {
      setIsFetching(true);

      const {
        Password: password,
        Email: email,
        Username: username,
      } = getValues();

      const response = await register(username, email, password);

      if (response) {
        AsyncStorage.setItem("jwtToken", response.access_token);
        loginInStore(username, response.access_token);
      }
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
      Toast.show({
        type: "error",
        text1:
          error instanceof Error || error instanceof AxiosError
            ? error.message
            : "An error occurred",
      });
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
        mainHeaderText="Sign up"
        secondaryHeaderText="Hello there! Let's create your account."
      >
        <View style={styles.formBody}>
          <View style={styles.inputsBody}>
            <ControlledInput<FormValues>
              control={control}
              error={errors.Username}
              name="Username"
              placeholder="Username"
              textContentType="username"
            />
            <ControlledInput<FormValues>
              control={control}
              error={errors.Email}
              onValueChange={() => {
                console.log(1);
              }}
              name="Email"
              placeholder="Email"
              textContentType="emailAddress"
              keyboardType="email-address"
            />
            <ControlledInput<FormValues>
              control={control}
              error={errors.Password}
              name="Password"
              placeholder="Password"
              textContentType="password"
              secureTextEntry
            />
            <ControlledInput<FormValues>
              control={control}
              error={errors.RepeatedPassword}
              name="RepeatedPassword"
              placeholder="Repeat your password"
              textContentType="password"
              secureTextEntry
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              label="Create account"
              variant="filled"
              disabled={isFetching}
              onPress={handleSubmit(handleRegister)}
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
  formBody: {
    gap: 24,
    paddingHorizontal: 18,
    paddingBottom: 24,
  },
  inputsBody: {
    gap: 26,
    paddingVertical: 32,
  },
  buttonsContainer: {
    display: "flex",
    gap: 8,
  },
});
