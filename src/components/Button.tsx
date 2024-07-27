import { forwardRef, Ref, useMemo, useState } from "react";
import {
  Button as ReactNativeButton,
  GestureResponderEvent,
  PressableProps,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";

type ButtonVariants = "outlined" | "filled";

type ButtonProps = {
  label: string;
  variant: ButtonVariants;
  styles?: { button: object; label: object };
  onPress?: () => void;
  onLongPress?: () => void;
} & PressableProps;

const Button = (
  { label, styles, variant, ...rest }: ButtonProps,
  ref: Ref<View>,
) => {
  const [isPressed, setIsPressed] = useState(false);
  const buttonStyles = useMemo(
    () =>
      variant === "filled"
        ? isPressed
          ? { ...defaultStyles.button, ...defaultStyles.filledPressed }
          : { ...defaultStyles.button, ...defaultStyles.filled }
        : isPressed
        ? { ...defaultStyles.button, ...defaultStyles.defaultPressed }
        : defaultStyles.button,
    [isPressed, styles?.button],
  );

  const labelStyles =
    variant === "filled"
      ? { ...defaultStyles.buttonLabel, ...defaultStyles.filledLabel }
      : defaultStyles.buttonLabel;

  return (
    <Pressable
      role="button"
      {...rest}
      ref={ref}
      style={{
        ...buttonStyles,
        ...styles?.button,
        ...(rest.disabled ? defaultStyles.disabledButton : {}),
      }}
      onPressIn={(e: GestureResponderEvent) => {
        rest.onPressIn?.(e);
        setIsPressed(true);
      }}
      onPressOut={(e: GestureResponderEvent) => {
        rest.onPressOut?.(e);
        setIsPressed(false);
      }}
    >
      <Text style={{ ...labelStyles, ...styles?.label }}>{label}</Text>
    </Pressable>
  );
};

const defaultStyles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 13,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: "transparent",
  },
  disabledButton: {
    backgroundColor: "#0C4180",
  },
  defaultPressed: {
    borderColor: "#D1E6FF",
  },
  filledPressed: {
    backgroundColor: "#0C4180",
    borderColor: "#D1E6FF",
  },
  filled: { backgroundColor: "#1B85F3" },
  buttonLabel: { color: "#1B85F3", fontWeight: "500" },
  filledLabel: { color: "white" },
});

export default forwardRef<View, ButtonProps>(Button);
