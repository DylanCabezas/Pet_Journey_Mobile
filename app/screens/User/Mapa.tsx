// src/screens/User/Mapa.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Mapa = () => {
  const places = [
    { id: 1, name: 'Parque Central', latitude: -12.0464, longitude: -77.0291 },
    { id: 2, name: 'Clínica Veterinaria', latitude: -12.0486, longitude: -77.0300 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lugares Cercanos</Text>
      <MapView style={styles.map} initialRegion={{
        latitude: -12.0464,
        longitude: -77.0291,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            title={place.name}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default Mapa;
