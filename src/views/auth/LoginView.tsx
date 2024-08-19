import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Link } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AxiosError } from 'axios';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { auth } from 'app/firebase.config';
import AuthCard from 'app/src/components/AuthCard';
import Button from 'app/src/components/Button';
import ControlledInput from 'app/src/components/FormControl/FormControlTextInput';
import { AuthStackParamList } from 'app/src/router/router.types';
import useAuthStore from 'app/src/store/AuthStore';
import { loginValidationSchema } from 'app/src/utils/validationSchemas/loginValidationSchema';

type ProfileScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

type FormValues = {
  Email: string;
  Password: string;
};

export const LoginView = ({ navigation }: Props) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(loginValidationSchema) });
  const { login } = useAuthStore();
  const [isFetching, setIsFetching] = useState(false);

  const handleLogin = async () => {
    try {
      setIsFetching(true);
      const { Password: password, Email: email } = getValues();
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (response) {
        login(response.user);
      }
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
        mainHeaderText="Login"
        secondaryHeaderText="Welcome back! Please enter your details."
      >
        <View style={styles.formBody}>
          <View style={styles.inputsBody}>
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
              onPress={() => navigation.navigate('ForgotPassword')}
            />
          </View>
        </View>
      </AuthCard>
      <Text style={styles.outCardText}>
        Don't have an account?{' '}
        <Link to={'/Register'} style={styles.outCardTextLink}>
          Sign up for free
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
