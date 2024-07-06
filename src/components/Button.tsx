import { useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from "react-native";

type ButtonVariants = "outlined" | "filled";

type ButtonProps = {
  label: string;
  variant: ButtonVariants;
  styles?: { button: object; label: object };
  onPress?: () => void;
  onLongPress?: () => void;
} & PressableProps;

const Button = ({ label, styles, variant, ...rest }: ButtonProps) => {
  const buttonStyles =
    variant === "filled"
      ? { ...defaultStyles.button, ...defaultStyles.filled }
      : defaultStyles.button;

  const labelStyles =
    variant === "filled"
      ? { ...defaultStyles.buttonLabel, ...defaultStyles.filledLabel }
      : defaultStyles.buttonLabel;

  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      role="button"
      {...rest}
      style={{ ...buttonStyles, ...styles?.button }}
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
  },
  filled: { backgroundColor: "#1B85F3" },
  buttonLabel: { color: "#1B85F3", fontWeight: "500" },
  filledLabel: { color: "white" },
});

export default Button;
