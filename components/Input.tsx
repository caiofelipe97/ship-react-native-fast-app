import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { FontSizes } from "@/constants/FontSizes";
import React, { useState, forwardRef } from "react";
import {
  ColorValue,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

const INPUT_HEIGHT = 50;
const MULTILINE_INPUT_HEIGHT = 96;

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  labelStyle?: TextStyle;
  placeholderTextColor?: ColorValue;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      disabled,
      containerStyle = {},
      labelStyle = {},
      icon,
      iconPosition = "right",
      placeholderTextColor = Colors.placeholderText,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const inputContainerStyles = [
      styles.inputContainer,
      props.multiline && styles.inputContainerMultiline,
      isFocused && styles.inputContainerFocused,
      !!error && styles.inputContainerError,
    ];

    const inputStyles = [
      styles.input,
      props.multiline && styles.inputMultiline,
      disabled && styles.inputDisabled,
    ];

    return (
      <View style={containerStyle}>
        {(label || error) && (
          <View style={!label ? styles.errorContainer : styles.labelContainer}>
            {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
            {error && <Text style={styles.errorMessage}>{error}</Text>}
          </View>
        )}
        <View style={inputContainerStyles}>
          {icon && iconPosition === "left" && (
            <View style={styles.icon}>{icon}</View>
          )}
          <TextInput
            style={inputStyles}
            placeholderTextColor={placeholderTextColor}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled}
            ref={ref}
            {...props}
          />
          {icon && iconPosition === "right" && (
            <View style={styles.icon}>{icon}</View>
          )}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  label: {
    color: Colors.darkText,
    fontFamily: Fonts.PoppinsSemibold,
    fontSize: FontSizes.body,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 8,
    borderColor: Colors.neutralDark,
    backgroundColor: Colors.componentBackground,
    height: INPUT_HEIGHT,
  },
  inputContainerMultiline: {
    height: MULTILINE_INPUT_HEIGHT,
  },
  inputContainerFocused: {
    borderWidth: 2,
    borderColor: Colors.primary,
    // backgroundColor: TBD
  },
  inputContainerError: {
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  inputContainerDisabled: {
    //  backgroundColor: TBD,
  },
  input: {
    flex: 1,
    height: INPUT_HEIGHT,
    color: Colors.neutralDark,
    fontFamily: Fonts.PoppinsRegular,
    fontSize: FontSizes.body,
  },
  inputMultiline: {
    height: MULTILINE_INPUT_HEIGHT,
  },
  inputDisabled: {
    // color: TBD,
  },
  errorMessage: {
    color: Colors.secondary,
    fontFamily: Fonts.PoppinsSemibold,
    fontSize: FontSizes.small,
    textAlign: "right",
    alignSelf: "flex-end",
  },
  icon: {
    marginLeft: 4,
    marginRight: 8,
  },
  errorContainer: {
    marginBottom: 2,
  },
  labelContainer: {
    marginBottom: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Input;
