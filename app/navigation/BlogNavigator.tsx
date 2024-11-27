import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BlogsScreen from '../screens/Blogs/BlogsScreen';
import PublicacionScreen from '../screens/Blogs/Publicacion';
import VistaBlogScreen from '../screens/Blogs/VistaBlog';

const Stack = createStackNavigator();

const BlogNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Blogs" component={BlogsScreen} />
      <Stack.Screen name="Publicar" component={PublicacionScreen} />
      <Stack.Screen name="Vista Blog" component={VistaBlogScreen} />
    </Stack.Navigator>
  );
};

export default BlogNavigator;
