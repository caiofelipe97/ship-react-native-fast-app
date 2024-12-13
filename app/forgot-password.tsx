import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import { useLoading } from "@/contexts/LoadingContext";
import { isValidEmail } from "@/utils/emailUtils";
import Button from "@/components/Button";
import Input from "@/components/Input";
import LogoIcon from "@/components/LogoIcon";
import { getPixelsFromPercentageHeight } from "@/utils/dimensionUtils";

export default function ForgotPasswordScreen() {
  const { setIsLoading } = useLoading();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const emailRef = useRef<TextInput>(null);

  const validateForm = (): boolean => {
    const validationErrors: Record<string, string> = {};

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      validationErrors.email = "Invalid email format";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleForgotPassword = async () => {
    if (!validateForm()) {
      emailRef.current?.focus();
      return;
    }

    setIsLoading(true);

    try {
      //const response = await requestPasswordReset({ email });

      // Alert.alert("Success");
      router.replace("/sign-in");
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message || "An unexpected error occurred. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.centeredContainer}>
            <View style={styles.logoContainer}>
              <LogoIcon size="large" />
            </View>
            <View style={styles.inputsContainer}>
              <Input
                label="Email"
                placeholder="Enter Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
                ref={emailRef}
                returnKeyType="done"
                error={errors.email}
                onSubmitEditing={handleForgotPassword}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <Button label="Send Reset Link" onPress={handleForgotPassword} />
            </View>
          </View>

          <View style={styles.footerContainer}>
            <Button
              label="Back to Login"
              variant="outlined"
              onPress={() => router.replace("/sign-in")}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  flexContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    alignSelf: "center",
    marginBottom: getPixelsFromPercentageHeight(3),
  },
  inputsContainer: {
    gap: getPixelsFromPercentageHeight(2),
    marginBottom: getPixelsFromPercentageHeight(4),
  },
  buttonsContainer: {
    gap: getPixelsFromPercentageHeight(2),
  },
  footerContainer: {
    alignItems: "center",
  },
});
