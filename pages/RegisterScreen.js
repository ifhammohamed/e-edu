import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Animated,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import {
  Text,
  TextInput,
  Button,
  Title,
  Dialog,
  Portal,
} from "react-native-paper";

export default function RegisterScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);

  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const showDialog = () => setSuccessDialog(true);
  const hideDialog = () => setSuccessDialog(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: data.name,
      });

      showDialog();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigation.navigate("Login");
    } catch (error) {
      console.error(error.message);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Image source={require("../assets/logo.png")} style={styles.image} />

          <View style={styles.signInContainer}>
            <Title style={styles.title}>Create Account</Title>

            {/* Name Field */}
            <Controller
              control={control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <View>
                  <TextInput
                    label="Full Name"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                    error={!!error}
                    left={<TextInput.Icon icon="account" />}
                  />
                  {error && (
                    <Text style={styles.errorText}>{error.message}</Text>
                  )}
                </View>
              )}
            />

            {/* Email Field */}
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email",
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <View>
                  <TextInput
                    label="Email"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                    error={!!error}
                    left={<TextInput.Icon icon="email" />}
                  />
                  {error && (
                    <Text style={styles.errorText}>{error.message}</Text>
                  )}
                </View>
              )}
            />

            {/* Password Field */}
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <View>
                  <TextInput
                    label="Password"
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                    error={!!error}
                    left={<TextInput.Icon icon="lock" />}
                  />
                  {error && (
                    <Text style={styles.errorText}>{error.message}</Text>
                  )}
                </View>
              )}
            />

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              style={styles.registerButton}
            >
              <Button mode="contained" loading={loading} style={styles.button}>
                Create Account
              </Button>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.loginButton}
            >
              <Button mode="outlined">Already have an account? Sign In</Button>
            </TouchableOpacity>

            <Portal>
              <Dialog
                visible={successDialog}
                onDismiss={hideDialog}
                style={styles.dialog}
              >
                <Dialog.Icon icon="check-circle" size={30} color="#4CAF50" />
                <Dialog.Title style={styles.dialogTitle}>
                  Registration Successful
                </Dialog.Title>
                <Dialog.Content>
                  <Text style={styles.dialogContent}>
                    Your account has been created successfully! You can now sign
                    in to access your account.
                  </Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button
                    mode="contained"
                    onPress={hideDialog}
                    style={styles.dialogButton}
                  >
                    Continue to Login
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  animatedContainer: {
    flex: 1,
    justifyContent: "center",
  },
  signInContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: -60,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 30,
    color: "#5A4AF4",
    fontWeight: "bold",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#ffffff",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 5,
  },
  button: {
    marginVertical: 10,
    borderRadius: 8,
    paddingVertical: 8,
  },
  registerButton: {
    marginTop: 10,
  },
  loginButton: {
    marginTop: 10,
  },
  dialog: {
    borderRadius: 12,
    backgroundColor: "#fefefe",
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  dialogContent: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginVertical: 10,
  },
  dialogButton: {
    alignSelf: "center",
    backgroundColor: "#5A4AF4",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 10,
  },
});
