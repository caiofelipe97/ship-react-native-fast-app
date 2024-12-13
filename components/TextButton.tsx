import { Colors } from "@/theme/Colors";
import { Fonts } from "@/theme/Fonts";
import { FontSizes } from "@/theme/FontSizes";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";

interface TextButtonProps extends TouchableOpacityProps {
  label?: string;
  onPress: () => void;
  disabled?: boolean;
}

const TextButton: React.FC<TextButtonProps> = ({
  label,
  onPress,
  disabled,
  ...props
}) => {
  const getLabelStyle = () => {
    if (disabled) {
      return styles.disabledLabel;
    }
    return styles.darkLabel;
  };
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={() => {
        onPress();
      }}
      disabled={disabled}
      {...props}
    >
      <Text style={[styles.label, getLabelStyle()]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  label: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: FontSizes.small,
  },
  disabledLabel: {
    // color: TBD
  },
  darkLabel: {
    color: Colors.darkText,
  },
});

export default TextButton;
