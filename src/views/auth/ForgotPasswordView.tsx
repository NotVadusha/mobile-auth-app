import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { auth } from 'app/firebase.config';
import AuthCard from 'app/src/components/AuthCard';
import Button from 'app/src/components/Button';
import ControlledInput from 'app/src/components/FormControl/FormControlTextInput';
import { AuthStackParamList } from 'app/src/router/router.types';
import { forgotPasswordSchema } from 'app/src/utils/validationSchemas/forgotPasswordSchema';
import { AxiosError } from 'axios';
import { FirebaseError } from 'firebase/app';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

type ProfileScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

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

  const handleSendMail = async () => {
    try {
      setIsFetching(true);
      const { Email: email } = getValues();

      await sendPasswordResetEmail(auth, email);

      Toast.show({
        type: 'success',
        text1: 'Check your email for the following instructions',
      });

      navigation.navigate('Login');

      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
      Toast.show({
        type: 'error',
        text1:
          error instanceof Error || error instanceof AxiosError || error instanceof FirebaseError
            ? error.message
            : 'An error occurred',
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        gap: 32,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100%',
        backgroundColor: '#1268CC',
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
              name={'Email'}
              placeholder={'Email'}
              textContentType={'emailAddress'}
              keyboardType={'email-address'}
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
    display: 'flex',
    gap: 8,
  },
});
