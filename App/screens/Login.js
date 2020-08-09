import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Formik, connect } from "formik";
import * as Yup from "yup";
import { HideWithKeyboard } from "react-native-hide-with-keyboard";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import ErrorMessage from "../components/ErrorMessage";
import AppLogo from "../components/AppLogo";
import { withFirebaseHOC } from "../config/Firebase";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("イーメール")
    .email("一致しません")
    .required("登録されたイーメールを入力してください"),
  password: Yup.string()
    .label("パスワード")
    .required("登録されたパスワードを入力してください")
    .min(6, "6文字以上入力してください")
});

function Login({ navigation, firebase }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("ios-eye");


  function goToSignup() {
    return navigation.navigate("Signup");
  }

  function goToForgotPassword() {
    return navigation.navigate("ForgotPassword");
  }

  function handlePasswordVisibility() {
    if (rightIcon === "ios-eye") {
      setRightIcon("ios-eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "ios-eye-off") {
      setRightIcon("ios-eye");
      setPasswordVisibility(!passwordVisibility);
    }
  }

  async function firebase_login(values) {
    const { email, password } = values;
    try {
      const response = await firebase.loginWithEmail(email, password);

      if (response.user) {
        console.log(response.user);
        navigation.navigate("App");
      }
    } catch (error) {
      actions.setFieldError("general", error.message);
    } finally {
      actions.setSubmitting(false);
    }
  }

  async function handleOnLogin(values) {
    const { email, password } = values;
    const formData = new FormData();
    formData.append('user_email', email);
    formData.append('user_password', password);
    fetch(`http://ec2-34-239-220-61.compute-1.amazonaws.com/login`,
      {
        method: 'POST',
        body: formData
      })
      .then((res) => res.text())
      .then(res => {
        firebase_login(values);
      })
      .catch((e) => console.log(e));

  }
  return (
    <SafeAreaView style={styles.container}>
      <HideWithKeyboard style={styles.logoContainer}>
        <AppLogo />
      </HideWithKeyboard>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          handleOnLogin(values, actions);
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          values,
          handleSubmit,
          errors,
          isValid,
          touched,
          handleBlur,
          isSubmitting
        }) => (
            <>
              <FormInput
                name="email"
                value={values.email}
                onChangeText={handleChange("email")}
                placeholder="イーメール書いてください"
                autoCapitalize="none"
                iconName="ios-mail"
                iconColor="#2C384A"
                onBlur={handleBlur("email")}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <FormInput
                name="password"
                value={values.password}
                onChangeText={handleChange("password")}
                placeholder="パスワードを書いてください"
                secureTextEntry={passwordVisibility}
                iconName="ios-lock"
                iconColor="#2C384A"
                onBlur={handleBlur("password")}
                rightIcon={
                  <TouchableOpacity onPress={handlePasswordVisibility}>
                    <Ionicons name={rightIcon} size={28} color="grey" />
                  </TouchableOpacity>
                }
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <View style={styles.buttonContainer}>
                <FormButton
                  //buttonType="outline"
                  onPress={handleSubmit}
                  title="ログイン"
                  buttonColor="white"
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </>
          )}
      </Formik>
      <Button
        title="アカウントがありませんか。サインアップ"
        onPress={goToSignup}
        titleStyle={{
          color: "#1fa518"
        }}
        type="clear"
      />
      <Button
        title="パスワードを忘れましたか。"
        onPress={goToForgotPassword}
        titleStyle={{
          color: "#ff9f0d" // 메인컬러
        }}
        type="clear"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: "center"
  },
  buttonContainer: {
    margin: 25
  }
});

export default withFirebaseHOC(Login);
