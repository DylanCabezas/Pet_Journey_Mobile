import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Login from './app/screens/Auth/Login';
import Register from './app/screens/Auth/Register';
import MainNavigator from './app/navigation/MainNavigator';  

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
  },
};

const Stack = createStackNavigator();

export default function App() {
  const isLoggedIn = false; 
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {isLoggedIn ? (
          <MainNavigator />  
        ) : (
          <Stack.Navigator initialRouteName="Register">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>  
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
