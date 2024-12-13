import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button";
import Input from "@/components/Input";
import LogoIcon from "@/components/LogoIcon";
import { getPixelsFromPercentageHeight } from "@/utils/dimensionUtils";
import TextButton from "@/components/TextButton";
import { useLoading } from "@/contexts/LoadingContext";

export default function RegistrationScreen() {
  const { registerUser } = useAuth();

  const { isLoading, setIsLoading } = useLoading();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    state: "",
    medicalCredentials: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const inputRefs: Record<string, React.RefObject<TextInput>> = {
    firstName: useRef<TextInput | null>(null),
    lastName: useRef<TextInput | null>(null),
    email: useRef<TextInput | null>(null),
    phoneNumber: useRef<TextInput | null>(null),
    city: useRef<TextInput | null>(null),
    state: useRef<TextInput | null>(null),
    medicalCredentials: useRef<TextInput | null>(null),
  };

  const handleRegister = async () => {
    setIsLoading(true);
    let firstEmptyFieldRef: React.RefObject<TextInput> | null = null;
    let isFormValid = true;

    Object.entries(form).forEach(([fieldName, value]) => {
      const inputRef = inputRefs[fieldName];
      if (!value) {
        isFormValid = false;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "Required",
        }));
        if (!firstEmptyFieldRef) {
          firstEmptyFieldRef = inputRef;
        }
      }
    });

    if (isFormValid) {
      try {
        // Async API call
        await registerUser({ ...form, isApproved: false });
        router.push("/registration-pending"); // Navigate to the pending screen
      } catch (error) {
        console.error("Failed to register user:", error);
        // Optionally show an error message to the user
      }
    } else if (firstEmptyFieldRef) {
      focusToInput(firstEmptyFieldRef);
    }
    setIsLoading(false);
  };

  const focusToInput = (inputRef: React.RefObject<TextInput>) => {
    inputRef.current?.focus();
  };

  const navigateToLoginScreen = () => {
    router.navigate("/login");
  };

  const handleInputChange = (fieldName: keyof typeof form, text: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: text,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
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
          <View style={styles.logoContainer}>
            <LogoIcon size="large" />
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.rowContainer}>
              <Input
                label="First Name"
                placeholder="First Name"
                value={form.firstName}
                onChangeText={(text) => handleInputChange("firstName", text)}
                ref={inputRefs.firstName}
                containerStyle={styles.inputContainer}
                returnKeyType="next"
                onSubmitEditing={() => inputRefs.lastName.current?.focus()}
                error={errors.firstName}
                disabled={isLoading}
              />
              <Input
                label="Last Name"
                placeholder="Last Name"
                value={form.lastName}
                onChangeText={(text) => handleInputChange("lastName", text)}
                ref={inputRefs.lastName}
                containerStyle={styles.inputContainer}
                returnKeyType="next"
                onSubmitEditing={() => inputRefs.email.current?.focus()}
                error={errors.lastName}
                disabled={isLoading}
              />
            </View>

            <Input
              label="Email"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={(text) => handleInputChange("email", text)}
              ref={inputRefs.email}
              onSubmitEditing={() => inputRefs.phoneNumber.current?.focus()}
              returnKeyType="next"
              error={errors.email}
              disabled={isLoading}
            />
            <Input
              label="Phone"
              placeholder="Phone"
              autoCapitalize="none"
              value={form.phoneNumber}
              onChangeText={(text) => handleInputChange("phoneNumber", text)}
              ref={inputRefs.phoneNumber}
              onSubmitEditing={() => inputRefs.city.current?.focus()}
              returnKeyType="next"
              error={errors.phoneNumber}
              disabled={isLoading}
            />
            <View style={styles.rowContainer}>
              <Input
                label="City"
                placeholder="City"
                value={form.city}
                onChangeText={(text) => handleInputChange("city", text)}
                ref={inputRefs.city}
                onSubmitEditing={() => inputRefs.state.current?.focus()}
                containerStyle={styles.inputContainer}
                returnKeyType="next"
                error={errors.city}
                disabled={isLoading}
              />
              <Input
                label="State"
                placeholder="State"
                value={form.state}
                onChangeText={(text) => handleInputChange("state", text)}
                ref={inputRefs.state}
                onSubmitEditing={() =>
                  inputRefs.medicalCredentials.current?.focus()
                }
                containerStyle={styles.inputContainer}
                returnKeyType="next"
                error={errors.state}
                disabled={isLoading}
              />
            </View>

            <Input
              label="Credentials"
              placeholder="Medical Credentials"
              value={form.medicalCredentials}
              onChangeText={(text) =>
                handleInputChange("medicalCredentials", text)
              }
              ref={inputRefs.medicalCredentials}
              returnKeyType="done"
              onSubmitEditing={handleRegister}
              error={errors.medicalCredentials}
              disabled={isLoading}
            />
          </View>
          <Button
            label="Request Registration"
            onPress={handleRegister}
            disabled={isLoading}
          />
          <View style={{ flex: 1 }} />
          <View style={styles.footerContainer}>
            <TextButton
              label="Already have an account?"
              onPress={navigateToLoginScreen}
              disabled={isLoading}
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
  logoContainer: {
    alignSelf: "center",
    marginBottom: getPixelsFromPercentageHeight(3),
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 10,
  },
  inputsContainer: {
    gap: getPixelsFromPercentageHeight(2),
    marginBottom: getPixelsFromPercentageHeight(3),
  },
  inputContainer: {
    flex: 1,
  },
  footerContainer: {
    alignItems: "center",
  },
});
