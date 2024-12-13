import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { FontSizes } from "@/constants/FontSizes";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "filled" | "outlined";
  type?: "primary" | "secondary";
  label?: string;
  onPress: () => void;
  disabled?: boolean;
  isSemiBold?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "filled",
  type = "primary",
  label,
  onPress,
  disabled,
  isSemiBold,
  ...props
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case "filled":
        return [
          styles.filledButton,
          type === "secondary" && styles.secondaryFilledButton,
          disabled && styles.disabledButton,
        ];
      case "outlined":
        return [styles.outlinedButton, disabled && styles.disabledButton];

      default:
        return styles.filledButton;
    }
  };

  const getLabelStyle = () => {
    const baseStyle = [styles.label, isSemiBold ? styles.semiBoldLabel : {}];
    if (disabled) {
      baseStyle.push(styles.disabledLabel);
    }
    if (variant === "outlined") {
      baseStyle.push(styles.darkLabel);
    } else {
      baseStyle.push(styles.whiteLabel);
    }
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), props.style]}
      onPress={() => {
        onPress();
      }}
      disabled={disabled}
      {...props}
    >
      <Text style={getLabelStyle()}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  label: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: FontSizes.body,
  },
  semiBoldLabel: {
    fontFamily: Fonts.PoppinsSemibold,
  },
  filledButton: {
    backgroundColor: Colors.primary,
  },
  secondaryFilledButton: {
    backgroundColor: Colors.secondary,
  },

  outlinedButton: {
    backgroundColor: Colors.componentBackground,
    borderWidth: 1,
    borderColor: Colors.neutralDark,
  },
  disabledButton: {},
  disabledLabel: {},
  darkLabel: {
    color: Colors.darkText,
  },
  whiteLabel: {
    color: Colors.white,
  },
});

export default Button;
