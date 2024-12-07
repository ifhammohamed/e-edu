import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
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

export default function LoginScreen({ navigation }) {
  const { control, handleSubmit } = useForm();
  const [errorDialog, setErrorDialog] = React.useState(false);
  const showDialog = () => setErrorDialog(true);
  const hideDialog = () => setErrorDialog(false);

  const onSubmit = async (data) => {
    try {
      const userdata = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      navigation.navigate("Home", { username: userdata.user.displayName });
    } catch (error) {
      showDialog();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require("../assets/logo.png")} style={styles.image} />

        <View style={styles.signInContainer}>
          {/* <Title style={styles.welcomeTitle}>Welcome to E Edu</Title> */}

          <Title style={styles.title}>Sign in</Title>
          {/* Email Field */}
          <Controller
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Email"
                mode="outlined"
                style={styles.input}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {/* Password Field */}
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry
                style={styles.input}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {/* Login Button */}
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Button mode="contained" style={styles.button}>
              Login
            </Button>
          </TouchableOpacity>
          {/* Navigate to Register */}
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Button mode="outlined">Register</Button>
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
                  Oops! The email or password you entered is incorrect. Please
                  try again.
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

  welcomeTitle: {
    fontSize: 36,
    textAlign: "center",
    marginBottom: 30,
    color: "#5A4AF4",
    fontWeight: "bold",
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
    backgroundColor: "#6200EE",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});
