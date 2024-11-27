import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/User/Profile';
import MascotasScreen from '../screens/User/Mascotas';
import BlogsScreen from '../screens/Blogs/BlogsScreen';
import MapaScreen from '../screens/User/Mapa';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          } else if (route.name === 'Mapa') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Blogs') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Mascotas') {
            iconName = focused ? 'paw' : 'paw-off';
          }
          return <MaterialCommunityIcons name={iconName as keyof typeof MaterialCommunityIcons.glyphMap} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Mascotas" component={MascotasScreen} />
      <Tab.Screen name="Blogs" component={BlogsScreen} />
      <Tab.Screen name="Mapa" component={MapaScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
