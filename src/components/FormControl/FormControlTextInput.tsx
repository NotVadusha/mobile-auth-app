import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import TextInput, { TextInputProps } from "../TextInput";

type ControlledInputProps<TData extends FieldValues> = {
  control: Control<TData, any>;
  name: Path<TData>;
  error: FieldError | undefined;
} & TextInputProps;

const ControlledInput = <TData extends FieldValues>({
  control,
  name,
  error,
  ...rest
}: ControlledInputProps<TData>) => {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextInput
            {...rest}
            {...field}
            styles={{
              input: error ? styles.formErrorInput : {},
              wrapper: error ? styles.formErrorInputWrapper : {},
            }}
          />
        )}
      />
      {error && <Text style={styles.formErrorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  formErrorText: {
    color: "red",
    paddingHorizontal: 12,
    paddingTop: 4,
  },
  formErrorInput: {
    borderColor: "red",
    borderWidth: 1,
  },
  formErrorInputWrapper: {
    borderColor: "pink",
    borderWidth: 2,
  },
});

export default ControlledInput;
