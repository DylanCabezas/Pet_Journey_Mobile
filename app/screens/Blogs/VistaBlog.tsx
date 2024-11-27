// src/screens/Blog/VistaBlog.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axiosInstance from '../../api/axiosConfig';
import { useRoute, useNavigation } from '@react-navigation/native';

const VistaBlog = () => {
  interface Post {
    title: string;
    content: string;
  }

  const [post, setPost] = useState<Post | null>(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { postId } = route.params as { postId: string }; 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`/blog/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error al obtener la publicación:', error);
      }
    };
    fetchPost();
  }, [postId]);

  return (
    <View style={styles.container}>
      {post ? (
        <>
          <Text style={styles.title}>{post.title}</Text>
          <Text>{post.content}</Text>
          <Button title="Volver" onPress={() => navigation.goBack()} />
        </>
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default VistaBlog;
