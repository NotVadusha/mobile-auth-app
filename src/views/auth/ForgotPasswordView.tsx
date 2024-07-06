import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { forgotPasswordSchema } from "../../utils/validationSchemas/forgotPasswordSchema";
import ControlledInput from "../../components/FormControl/FormControlTextInput";
import AuthCard from "../../components/AuthCard";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";

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
              name="Email"
              placeholder="Email"
              textContentType="emailAddress"
              keyboardType="email-address"
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
