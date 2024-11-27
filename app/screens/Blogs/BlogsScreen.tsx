import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import axiosInstance from '../../api/axiosConfig';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

interface Blog {
  id: number;
  title: string;
  content: string;
}

const BlogsScreen = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  type BlogsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Blogs'>;
  
  const navigation = useNavigation<BlogsScreenNavigationProp>();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get('/blog');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error al obtener blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleViewPost = (postId: number) => {
    navigation.navigate('Publicacion', { postId });
  };

  return (
    <View style={styles.container}>
      <Button title="Crear Publicación" onPress={() => navigation.navigate('Publicacion', { postId: undefined })} />
      <FlatList
        data={blogs}
        renderItem={({ item }) => (
          <View style={styles.blogItem}>
            <Text style={styles.title} onPress={() => handleViewPost(item.id)}>{item.title}</Text>
            <Text>{item.content.substring(0, 100)}...</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  blogItem: {
    padding: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BlogsScreen;
