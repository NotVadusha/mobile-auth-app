import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { forgotPasswordSchema } from "../../utils/validationSchemas/forgotPasswordSchema";
import ControlledInput from "../../components/FormControl/FormControlTextInput";
import AuthCard from "../../components/AuthCard";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { AuthStackParamList } from "../../router/router.types";
import { useState } from "react";
import { receiveMail } from "../../services/auth.service";
import useAuthStore from "../../store/AuthStore";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ForgotPassword"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

type FormValues = {
  Email: string;
};

export const ForgotPasswordView = ({ navigation }: Props) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(forgotPasswordSchema) });
  const [isFetching, setIsFetching] = useState(false);
  const { setForgotPasswordMail } = useAuthStore();

  const handleSendMail = async () => {
    try {
      setIsFetching(true);
      const { Email: email } = getValues();
      const res = await receiveMail(email);
      if (res) {
        setForgotPasswordMail(email);
        navigation.navigate("ConfirmResetCode");
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
        mainHeaderText="Forgot password?"
        secondaryHeaderText="Please, enter email associated with your account."
      >
        <View style={styles.formBody}>
          <View style={styles.inputsBody}>
            <ControlledInput
              control={control}
              error={errors.Email}
              name={"Email"}
              placeholder={"Email"}
              textContentType={"emailAddress"}
              keyboardType={"email-address"}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              label="Submit"
              variant="filled"
              disabled={isFetching}
              onPress={handleSubmit(handleSendMail)}
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
