import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
  ActivityIndicator,
  Dialog,
} from "react-native-paper";

export default function RegisterScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [successDialog, setSuccessDialog] = React.useState(false);
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
      await new Promise((resolve) => setTimeout(resolve, 3000));
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
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={require("../assets/logo.png")} style={styles.image} />

        <View style={styles.signInContainer}>
          <Title style={styles.title}>Register</Title>

          {/* Name Field */}
          <Controller
            control={control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                label="Name"
                mode="outlined"
                onChangeText={onChange}
                value={value}
                error={!!errors.name}
              />
            )}
          />
          {errors.name && (
            <Text style={styles.error}>{errors.name.message}</Text>
          )}

          {/* Email Field */}
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                label="Email"
                mode="outlined"
                onChangeText={onChange}
                value={value}
                error={!!errors.email}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}

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
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                label="Password"
                mode="outlined"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                error={!!errors.password}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}

          {/* Submit Button */}
          <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={loading}>
            <Button mode="contained" style={styles.button}>
              {loading ? (
                <ActivityIndicator animating={true} color="#fff" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Button mode="outlined" style={styles.Registorbutton}>
              Login
            </Button>
          </TouchableOpacity>

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
                Your account has been created successfully! You can now log in
                and start using MovieCatch.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                mode="contained"
                onPress={hideDialog}
                style={styles.dialogButton}
              >
                Continue
              </Button>
            </Dialog.Actions>
          </Dialog>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
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
  },
  image: {
    // width: 100,
    // height: 100,
    alignSelf: "center",
    // borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 30,
    color: "#5A4AF4",
    fontWeight: "bold",
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginVertical: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
  dialog: {
    borderRadius: 8,
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
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});
