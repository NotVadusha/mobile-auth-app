import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Link } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { loginValidationSchema } from "../../utils/validationSchemas/loginValidationSchema";
import ControlledInput from "../../components/FormControl/FormControlTextInput";
import { login } from "../../services/auth.service";
import AuthCard from "../../components/AuthCard";
import Button from "../../components/Button";
import useAuthStore from "../../store/AuthStore";
import { AuthStackParamList } from "../../router/router.types";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

type FormValues = {
  Username: string;
  Password: string;
};

export const LoginView = ({ navigation }: Props) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(loginValidationSchema) });
  const { login: loginInStore } = useAuthStore();
  const [isFetching, setIsFetching] = useState(false);

  const handleLogin = async () => {
    try {
      setIsFetching(true);
      const { Password: password, Username: username } = getValues();
      const response = await login(username, password);

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
        mainHeaderText="Login"
        secondaryHeaderText="Welcome back! Please enter your details."
      >
        <View style={styles.formBody}>
          <View style={styles.inputsBody}>
            <ControlledInput<FormValues>
              control={control}
              error={errors.Username}
              name="Username"
              placeholder="Username"
            />
            <ControlledInput<FormValues>
              control={control}
              name="Password"
              error={errors.Password}
              textContentType="password"
              secureTextEntry
              placeholder="Password"
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              label="Sign in"
              variant="filled"
              disabled={isFetching}
              onPress={handleSubmit(handleLogin)}
            />
            <Button
              label="Forgot password?"
              variant="outlined"
              onPress={() => navigation.navigate("ForgotPassword")}
            />
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
