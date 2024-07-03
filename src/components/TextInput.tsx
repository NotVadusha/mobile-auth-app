import { Dispatch, SetStateAction, useMemo, useState } from "react";
import {
  StyleSheet,
  TextInput as ReactNativeTextInput,
  TextInputProps as ReactNativeInputProps,
  View,
} from "react-native";

type TextInputProps = {
  placeholder: string;
  styles?: { wrapper: object; input: object };
  value: string;
  onValueChange: Dispatch<SetStateAction<string>>;
} & ReactNativeInputProps;

const TextInput = ({
  placeholder,
  styles = { input: {}, wrapper: {} },
  value,
  onValueChange,
  ...rest
}: TextInputProps) => {
  const setValue = (newValue: string) => {
    onValueChange(newValue);
  };

  const [focused, setFocused] = useState(false);

  const inputStyles = useMemo(
    () =>
      focused
        ? {
            ...defaultStyles.textInput,
            ...defaultStyles.focusedInput,
            ...styles.input,
          }
        : { ...defaultStyles.textInput, ...styles.input },
    [focused, styles?.input],
  );

  const wrapperStyles = useMemo(
    () =>
      focused
        ? {
            ...defaultStyles.textInputWrapper,
            ...defaultStyles.textInputWrapperFocused,
            ...styles.wrapper,
          }
        : { ...defaultStyles.textInputWrapper, ...styles.wrapper },
    [focused, styles?.wrapper],
  );

  return (
    <View style={wrapperStyles}>
      <ReactNativeTextInput
        style={inputStyles}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  textInput: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderColor: "#D9DFE6",
    borderWidth: 1,
  },
  focusedInput: {
    borderColor: "#1B85F3",
  },
  textInputWrapperFocused: { borderColor: "#D1E6FF" },
  textInputWrapper: {
    borderRadius: 16,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 2,
  },
});

export default TextInput;
