import React, {useState} from 'react';
import { View, SafeAreaView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useFormik } from 'formik';
import { styles } from "./RegisterEmailSreen.styles";
import { initialValues, validationSchema } from "./RegisterEmailScreen.data";
import { Auth } from "../../../api";


const auth = new Auth();

export function RegisterEmailScreen(props) {
  const { navigation } = props;
  const [showPassword, setShowPassword] = useState(false);

  const onShowPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,

    onSubmit: async(formValuer) => {
      try {
        await auth.register(formValuer);
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    }

  });

  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.form}>
        <Input 
        placeholder='Correo electronico' 
        autoCapitalize='none' 
        onChangeText={(text) => formik.setFieldValue("email", text.toLowerCase())}
        errorMessage={formik.errors.email}
        />

        <Input 
        placeholder='Nombre' 
        autoCapitalize='none'
        onChangeText={(text) => formik.setFieldValue("first_name", text)}
        errorMessage={formik.errors.first_name}
        />

        <Input 
        placeholder='Username' 
        autoCapitalize='none'
        onChangeText={(text) => formik.setFieldValue("username", text)}
        errorMessage={formik.errors.username}
        />

        <Input 
        placeholder='Contraseña' 
        secureTextEntry={!showPassword} 
        rightIcon={{type: "material-community", name: showPassword ? "eye-off-outline": "eye-outline", onPress: onShowPassword}}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
        />

        <Input 
        placeholder='Repetir Contraseña' 
        secureTextEntry={!showPassword} 
        rightIcon={{type: "material-community", name: showPassword ? "eye-off-outline": "eye-outline", onPress: onShowPassword}}
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        errorMessage={formik.errors.repeatPassword}
        />
      </View>
      <Button 
      title="Registrate" 
      containerStyle={styles.btnContainer}
      onPress={formik.handleSubmit}
      loading={formik.isSubmitting}
      />
    </SafeAreaView>
  )
}