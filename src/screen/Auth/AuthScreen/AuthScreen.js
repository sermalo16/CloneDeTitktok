import React from 'react';
import { Text, Icon } from "react-native-elements";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { useTheme } from "../../../hooks";
import { screen } from "../../../utils";
import { styled } from "./AuthScreen.styles";

export function AuthScreen(props) {
  const {navigation} = props;
  const { toggleTheme } = useTheme();
  const styles = styled();

  const goToRegisterEmail = () => {
    navigation.navigate(screen.auth.registerEmail);
  }

  const goToLoginEmail = () => {
    navigation.navigate(screen.auth.loginEmail);
  }

  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.optionsContent}>
        <Text style={styles.title}>Registrate en Tiktok</Text>
        <Text style={styles.info}>Crea un perfil, sigue otras cuentas, sube tus propios videos y mas.</Text>
        <TouchableOpacity 
        onPress={goToRegisterEmail} 
        style={styles.itemregister}>
          <Icon type="material-community" name="at"/>
          <Text>User correo electronico</Text>
          <View/>
        </TouchableOpacity>
      </View>

      <View style={styles.loginContent}>
        <Text>Ya tienes una cuenta?{" "}
          <Text style={styles.login} onPress={goToLoginEmail}>Iniciar Sesion</Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}