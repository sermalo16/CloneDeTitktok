import React, {useState} from 'react';
import { View, SafeAreaView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles } from "./LoginEmailScreen.styles";
import { initialValues, validationSchema } from "./LoginEmailScreen.data";
import { useFormik } from 'formik';
import { Auth } from "../../../api";
import { useAuth } from "../../../hooks";


const auth = new Auth();

export function LoginEmailScreen() {

  const {login} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const onShowPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,

    onSubmit: async(formValuer) => {
      try {
        const response = await auth.login(formValuer);
        login(response);
      } catch (error) {
        console.log(error);
      }
    }

  });


  return (
    <SafeAreaView style= {styles.content}>
      <View style={styles.form}>
        <Input
        placeholder='Correo electronico'
        autoCapitalize='none' onChangeText={(text) => formik.setFieldValue("email", text.toLowerCase())} 
        errorMessage={formik.errors.email}
        />

        <Input
        placeholder='Contraseña'
        secureTextEntry={!showPassword}
        rightIcon={{type: "material-community", name: showPassword ? "eye-off-outline": "eye-outline", onPress: onShowPassword}}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
        />

      </View>

      <Button
      title="Iniciar Session"
      containerStyle={styles.btnContainer}
      onPress={formik.handleSubmit}
      loading={formik.isSubmitting}
      />

    </SafeAreaView>
  )
}