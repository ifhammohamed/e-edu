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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import {
  Text,
  TextInput,
  Button,
  Title,
  Dialog,
  Portal,
} from "react-native-paper";
import { useUser } from "../context/UserContext";

export default function LoginScreen({ navigation }) {
  const { control, handleSubmit } = useForm();
  const [errorDialog, setErrorDialog] = useState(false);
  const { setUserEmail } = useUser();
  const [loading, setLoading] = useState(false);

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

  const showDialog = () => setErrorDialog(true);
  const hideDialog = () => setErrorDialog(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userdata = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      setUserEmail(data.email);
      navigation.navigate("Home", { username: userdata.user.displayName });
    } catch (error) {
      showDialog();
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
            <Title style={styles.title}>Welcome Back</Title>

            <Controller
              control={control}
              name="email"
              rules={{ required: "Email is required" }}
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

            <Controller
              control={control}
              name="password"
              rules={{ required: "Password is required" }}
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
              style={styles.loginButton}
            >
              <Button mode="contained" loading={loading} style={styles.button}>
                Sign In
              </Button>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={styles.registerButton}
            >
              <Button mode="outlined">Create Account</Button>
            </TouchableOpacity>

            <Portal>
              <Dialog
                visible={errorDialog}
                onDismiss={hideDialog}
                style={styles.dialog}
              >
                <Dialog.Icon icon="alert-circle" size={30} color="#FF0000" />
                <Dialog.Title style={styles.dialogTitle}>
                  Login Error
                </Dialog.Title>
                <Dialog.Content>
                  <Text style={styles.dialogContent}>
                    Incorrect email or password. Please try again.
                  </Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button
                    mode="contained"
                    onPress={hideDialog}
                    style={styles.dialogButton}
                  >
                    OK
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
  loginButton: {
    marginTop: 10,
  },
  registerButton: {
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
