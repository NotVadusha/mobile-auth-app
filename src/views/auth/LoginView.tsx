import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@react-navigation/native";
import * as yup from "yup";
import TextInput from "../../components/TextInput";
import AuthCard from "../../components/AuthCard";
import Button from "../../components/Button";
import { login } from "../../services/auth.service";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  {
    Home: undefined;
    Login: undefined;
    ForgotPassword: undefined;
  },
  "Login"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

type FormValues = {
  Username: string;
  Password: string;
};

const schema = yup
  .object({
    Username: yup.string().min(3).required(),
    Password: yup.string().min(8).required(),
  })
  .required();

export const LoginView = ({ navigation }: Props) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const handleLogin = async () => {
    try {
      const { Password: password, Username: username } = getValues();
      const response = await login(username, password);

      response && AsyncStorage.setItem("jwtToken", response.access_token);
    } catch (error) {
      console.log(error);
      console.warn("Fetch error");
    }
  };

  console.log(getValues());

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
            <View>
              <Controller
                control={control}
                name="Username"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    textContentType="username"
                    placeholder="Username"
                  />
                )}
              />
              {errors.Username && (
                <Text style={styles.formError}>{errors.Username.message}</Text>
              )}
            </View>
            <View>
              <Controller
                control={control}
                name="Password"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    textContentType="password"
                    secureTextEntry
                    placeholder="Password"
                  />
                )}
              />
              {errors.Password && (
                <Text style={styles.formError}>{errors.Password.message}</Text>
              )}
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              label="Sign in"
              variant="filled"
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
  formError: {
    color: "red",
    paddingHorizontal: 12,
    paddingTop: 4,
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
