import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function NotFoundScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/NotFound.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Pagina no encontrada!</Text>
      <Text style={styles.link} onPress={() => navigation.navigate('HomeScreen')}>
        Click para volver al inicio
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4df92',
  },
  image: {
    width: 300,
    height: 150,
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  link: {
    marginTop: 15,
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
