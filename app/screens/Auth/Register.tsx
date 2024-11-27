import React, { useState } from 'react';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import axiosInstance from '../../api/axiosConfig';  // Asegúrate de que axiosInstance esté correctamente configurado
import { useNavigation } from '@react-navigation/native';
import { PetPaw } from '@/components/PetPaw'; // Asegúrate de que la ruta de PetPaw sea correcta

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'usuario' | 'cuidador'>('usuario'); // Asumiendo que el rol puede ser usuario o cuidador
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const theme = useTheme();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/usuario/register', {
        username,
        email,
        password,
        role,
      });
      console.log('Usuario registrado:', response.data);
      Alert.alert('Registro exitoso', 'Ahora puedes completar tu perfil.');
      navigation.navigate('Profile'); // Navega al perfil después del registro exitoso
    } catch (error) {
      console.error('Error al registrar:', error);
      Alert.alert('Error', (error as any).message || 'Hubo un problema al registrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.headerContent}>
        <View style={styles.contentRow}>
          <PetPaw inverted />
          <Text style={styles.welcomeText}>¡Bienvenido a PetJourney!</Text>
          <PetPaw />
        </View>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          label="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon icon="account" />}
          activeOutlineColor={theme.colors.primary}
        />
        <TextInput
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          mode="outlined"
          left={<TextInput.Icon icon="email" />}
          activeOutlineColor={theme.colors.primary}
        />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon icon="lock" />}
          activeOutlineColor={theme.colors.primary}
        />
        <Button
          mode="contained"
          onPress={handleRegister}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Registrarse
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContent: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A1CEDC',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 10,
  },
});

export default Register;
