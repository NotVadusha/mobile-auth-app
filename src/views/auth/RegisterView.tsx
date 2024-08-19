import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Link } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AxiosError } from 'axios';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { app, getAuth } from 'app/firebase.config';
import AuthCard from 'app/src/components/AuthCard';
import Button from 'app/src/components/Button';
import ControlledInput from 'app/src/components/FormControl/FormControlTextInput';
import { AuthStackParamList } from 'app/src/router/router.types';
import useAuthStore from 'app/src/store/AuthStore';
import { registerValidationSchema } from 'app/src/utils/validationSchemas/registerValidationSchema';

type ProfileScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

type FormValues = {
  Username: string;
  Email: string;
  Password: string;
  RepeatedPassword: string;
};

const auth = getAuth(app);
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

  const { login } = useAuthStore();

  const handleRegister = async () => {
    try {
      setIsFetching(true);

      const { Password: password, Email: email, Username: username } = getValues();

      const response = await createUserWithEmailAndPassword(auth, email, password);

      console.log(response);

      updateProfile(response.user, { displayName: username });

      sendEmailVerification(response.user);

      if (response) {
        login(response.user);
      }
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
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
        Already have an account?{' '}
        <Link to={'/Login'} style={styles.outCardTextLink}>
          Login
        </Link>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outCardText: {
    fontSize: 14,
    color: '#D9DFE6',
    textAlign: 'center',
    fontFamily: 'Noto Sans',
    fontWeight: '500',
  },
  outCardTextLink: { color: 'white' },
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
    display: 'flex',
    gap: 8,
  },
});
