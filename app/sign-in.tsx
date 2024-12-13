import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { getPixelsFromPercentageHeight } from "@/utils/dimensionUtils";
import { useLoading } from "@/contexts/LoadingContext";
import { isValidEmail } from "@/utils/emailUtils";
import TextButton from "@/components/TextButton";

export default function SignInScreen() {
  const { setIsLoading } = useLoading();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const validateForm = (): boolean => {
    const validationErrors: Record<string, string> = {};

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleLogin = async () => {
    // if (!validateForm()) {
    //   focusFirstErrorField();
    //   return;
    // }
    // setIsLoading(true);
    // const ok = await signIn({ email, password });
    // setIsLoading(false);
    // if (ok) {
    //   router.replace("/(tabs)");
    // } else {
    //   Alert.alert(
    //     "Invalid credentials",
    //     "Please check your email and password and try again."
    //   );
    // }
  };

  const focusFirstErrorField = () => {
    if (errors.email) {
      emailRef.current?.focus();
    } else if (errors.password) {
      passwordRef.current?.focus();
    }
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password
  };

  const navigateToSignUpScreen = () => {
    router.navigate("/sign-up");
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
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                error={errors.email}
              />
              <Input
                label="Password"
                placeholder="Enter Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
                ref={passwordRef}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                error={errors.password}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <Button label="Login" onPress={handleLogin} />
              <Button
                label="Forgot Password?"
                onPress={handleForgotPassword}
                variant="outlined"
              />
            </View>
          </View>

          <View style={{ flex: 1 }} />

          <View style={styles.footerContainer}>
            <TextButton
              label="Don’t Have An Account?"
              onPress={navigateToSignUpScreen}
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
