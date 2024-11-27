// src/screens/Auth/Login.tsx
import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import axiosInstance from '../../api/axiosConfig';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/usuario/login', { email, password });
      console.log('Login exitoso:', response.data);
      navigation.navigate('Profile');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin}>
        Iniciar sesión
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
});

export default Login;
