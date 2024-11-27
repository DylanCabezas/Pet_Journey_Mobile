// Publicacion.tsx
import React, { useState } from 'react';
import { TextInput, Button, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import axiosInstance from '../../api/axiosConfig';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';  

const Publicacion = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); 

  const handleCreatePost = async () => {
    try {
      const response = await axiosInstance.post('/blog/publicar', {
        title,
        content,
      });
      console.log('Publicación creada:', response.data);
      navigation.navigate('Blogs');  // Navegamos a la pantalla de Blogs
    } catch (error) {
      console.error('Error al crear publicación:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label="Contenido"
        value={content}
        onChangeText={setContent}
        style={styles.input}
        multiline
      />
      <Button mode="contained" onPress={handleCreatePost}>
        Publicar
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

export default Publicacion;
