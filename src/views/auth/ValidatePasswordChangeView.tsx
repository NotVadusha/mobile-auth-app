import { Link } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import AuthCard from "../../components/AuthCard";
import { AuthStackParamList } from "../../router/router.types";
import { useForm } from "react-hook-form";
import { validateCodeSchema } from "../../utils/validationSchemas/validateCodeSchema";
import { receiveMail, validateCode } from "../../services/auth.service";
import useAuthStore from "../../store/AuthStore";
import ControlledInput from "../../components/FormControl/FormControlTextInput";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ConfirmResetCode"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

type FormValues = {
  Code: string;
};

export const ValidatePasswordChangeView = ({ navigation }: Props) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(validateCodeSchema) });
  const [isFetching, setIsFetching] = useState(false);
  const [isLinkBlocked, setIsLinkBlocked] = useState(false);
  const { getForgotPasswordMail, setForgotPasswordToken } = useAuthStore();

  const handleValidateCode = async () => {
    try {
      setIsFetching(true);
      const { Code: code } = getValues();
      const email = getForgotPasswordMail();

      if (!email) {
        navigation.navigate("ForgotPassword");
        return;
      }

      const updatePasswordToken = await validateCode(email, Number(code));
      setForgotPasswordToken(updatePasswordToken?.updatePasswordToken ?? null);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
      console.warn("Fetch error");
    }
  };

  const handleResendMail = async () => {
    try {
      setIsLinkBlocked(true);
      const { getForgotPasswordMail } = useAuthStore();
      const email = getForgotPasswordMail();

      if (!email) {
        navigation.navigate("ForgotPassword");
        return;
      }

      await receiveMail(email);
      setTimeout(() => setIsLinkBlocked(false), 60000);
    } catch (error) {
      setIsLinkBlocked(false);
      console.log(error);
      console.warn("Fetch error");
    }
  };

  const onInputChange = () => {
    const { Code: code } = getValues();
    if (code.length === 6) handleValidateCode();
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
        mainHeaderText="Code validation"
        secondaryHeaderText="Please enter the 4 digit code sent to your email"
      >
        <View style={styles.formBody}>
          <View style={styles.inputsBody}>
            <ControlledInput
              control={control}
              error={errors.Code}
              name="Code"
              keyboardType="decimal-pad"
              textContentType="oneTimeCode"
              placeholder="Enter code"
              onChange={onInputChange}
            />
            <Text style={styles.outCardText}>
              Didn't get the code?{" "}
              <Pressable onPress={handleResendMail} disabled={isLinkBlocked}>
                <Text style={styles.outCardTextLink}>
                  {isLinkBlocked ? "Resend code" : "Wait before the next try"}
                </Text>
              </Pressable>
            </Text>
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
