import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { resetPasswordSchema } from "../../utils/validationSchemas/resetPasswordSchema";
import ControlledInput from "../../components/FormControl/FormControlTextInput";
import AuthCard from "../../components/AuthCard";
import Button from "../../components/Button";
import { AuthStackParamList } from "../../router/router.types";
import { useState } from "react";
import { updatePassword } from "../../services/auth.service";
import useAuthStore from "../../store/AuthStore";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ResetPassword"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

type FormValues = {
  Password: string;
  RepeatedPassword: string;
};

export const ResetPasswordView = ({ navigation }: Props) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(resetPasswordSchema) });
  const [isFetching, setIsFetching] = useState(false);
  const {
    getForgotPasswordMail,
    getForgotPasswordToken,
    setForgotPasswordMail,
    setForgotPasswordToken,
  } = useAuthStore();

  const handleValidateCode = async () => {
    try {
      setIsFetching(true);
      const { Password: password } = getValues();
      const email = getForgotPasswordMail();
      const token = getForgotPasswordToken();

      if (!email) {
        navigation.navigate("ForgotPassword");
        return;
      }
      if (!token) {
        navigation.navigate("ConfirmResetCode");
        return;
      }

      await updatePassword(email, password, token);

      setForgotPasswordMail(null);
      setForgotPasswordToken(null);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
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
      <AuthCard mainHeaderText="Reset password" secondaryHeaderText="">
        <View style={styles.formBody}>
          <View style={styles.inputsBody}>
            <ControlledInput
              control={control}
              error={errors.Password}
              name="Password"
              placeholder="Password"
              textContentType="password"
              secureTextEntry
            />
            <ControlledInput
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
              label="Submit"
              variant="filled"
              disabled={isFetching}
              onPress={handleSubmit(handleValidateCode)}
            />
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
