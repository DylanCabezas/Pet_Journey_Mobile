import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import * as Location from 'expo-location'; // Usar expo-location para la ubicación

const Profile: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch profile data from backend
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('https://your-api-url/usuario/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include authorization token or other headers if needed
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching profile data');
        }

        const data = await response.json();
        const { name, address, age, photoUri } = data;

        setName(name || '');
        setAddress(address || '');
        setAge(age ? age.toString() : '');
        setPhotoUri(photoUri || null);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        Alert.alert('Error', 'No se pudieron cargar los datos del perfil');
      }
    };

    fetchProfileData();
  }, []);

  // Request location permission and get current location
  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permiso para acceder a la ubicación denegado');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };

    getLocation();
  }, []);

  // Image selection handler
  const handleImageSelection = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      return;
    }

    if (response.errorMessage) {
      Alert.alert('Error', response.errorMessage);
      return;
    }

    const uri = response.assets?.[0]?.uri;
    if (uri) {
      setPhotoUri(uri);
    } else {
      Alert.alert('Error', 'No se pudo obtener la imagen');
    }
  };

  // Select image from gallery
  const selectImage = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
      maxWidth: 500,
      maxHeight: 500,
    }, handleImageSelection);
  };

  // Take photo with camera
  const takePhoto = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.7,
      maxWidth: 500,
      maxHeight: 500,
    }, handleImageSelection);
  };

  // Save profile changes
  const saveChanges = async () => {
    try {
      // Validate inputs
      if (!name.trim()) {
        Alert.alert('Error', 'Por favor ingrese un nombre');
        return;
      }

      if (age && isNaN(Number(age))) {
        Alert.alert('Error', 'La edad debe ser un número válido');
        return;
      }

      const profileData = {
        name: name.trim(),
        address: address.trim(),
        age: age ? Number(age) : null,
        photoUri
      };

      const response = await fetch('https://your-api-url/usuario/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization token if needed
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Error saving profile');
      }

      Alert.alert('Éxito', 'Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'No se pudo guardar el perfil');
    }
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <Image 
          source={{ uri: photoUri }} 
          style={styles.profileImage} 
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>Sin foto</Text>
        </View>
      )}

      <View style={styles.imageButtons}>
        <TouchableOpacity onPress={selectImage} style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={takePhoto} style={styles.button}>
          <Text style={styles.buttonText}>Tomar Foto</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nombre"
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Dirección"
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        placeholder="Edad"
        style={styles.input}
        placeholderTextColor="#888"
      />

      {location ? (
        <Text style={styles.locationText}>
          Ubicación: {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}
        </Text>
      ) : (
        <Text style={styles.locationText}>Cargando ubicación...</Text>
      )}

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <Button 
        title="Guardar Cambios" 
        onPress={saveChanges} 
        color="#6200ee"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e0e0e0',
    alignSelf: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    flex: 0.48,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  locationText: {
    marginVertical: 10,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Profile;
