import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";

export default function MascotasPerdidas() {
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    desaparecidoDesde: new Date(),
    ultimaUbicacion: null as Location.LocationObjectCoords | null,
    direccion: "",
    genero: "",
    descripcion: "",
    contactoEmail: "",
    contactoTelefono: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleInputChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const openMap = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permiso de ubicación denegado.");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    handleInputChange("ultimaUbicacion", location.coords);
    setShowMap(true);
  };

  const handleMapPress = async (event: any) => {
    const coords = event.nativeEvent.coordinate;
    handleInputChange("ultimaUbicacion", coords);

    const reverseGeocode = await Location.reverseGeocodeAsync(coords);
    const address = reverseGeocode[0];
    const formattedAddress = `${address.street || "Calle desconocida"}, ${address.city || ""}, ${address.region || ""}`;
    handleInputChange("direccion", formattedAddress);

    setShowMap(false);
  };

  const handleSubmit = () => {
    if (!formData.contactoEmail.endsWith("@gmail.com")) {
      alert("El correo debe ser @gmail.com");
      return;
    }

    if (formData.contactoTelefono.length !== 9) {
      alert("El número de teléfono debe tener 9 dígitos.");
      return;
    }

    console.log("Datos enviados:", formData, image);
    alert("¡Mascota publicada!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Publicar Mascota Perdida</Text>

      {/* Subir imagen */}
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Subir Foto</Text>
        )}
      </TouchableOpacity>

      {/* Nombre */}
      <TextInput
        placeholder="Nombre"
        style={styles.input}
        onChangeText={(text) => handleInputChange("nombre", text)}
        value={formData.nombre}
      />

      {/* Fecha de desaparición */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>
          {formData.desaparecidoDesde
            ? formData.desaparecidoDesde.toLocaleDateString()
            : "Seleccionar Fecha"}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={formData.desaparecidoDesde || new Date()}
          mode="date"
          display="default"
          onChange={(event: any, date: Date | undefined) => {
            setShowDatePicker(false);
            if (date) handleInputChange("desaparecidoDesde", date);
          }}
        />
      )}

      {/* Última ubicación */}
      <TouchableOpacity onPress={openMap} style={styles.input}>
        <Text>
          {formData.direccion
            ? `Ubicación seleccionada: ${formData.direccion}`
            : "Seleccionar ubicación"}
        </Text>
      </TouchableOpacity>

      {/* Modal para el mapa */}
      <Modal visible={showMap} animationType="slide">
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: formData.ultimaUbicacion?.latitude || -12.0464,
            longitude: formData.ultimaUbicacion?.longitude || -77.0428,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={handleMapPress}
        >
          {formData.ultimaUbicacion && (
            <Marker
              coordinate={{
                latitude: formData.ultimaUbicacion.latitude,
                longitude: formData.ultimaUbicacion.longitude,
              }}
              title="Ubicación seleccionada"
            />
          )}
        </MapView>
        <Button title="Cerrar mapa" onPress={() => setShowMap(false)} />
      </Modal>

      {/* Género */}
      <View style={[styles.input, { height: 50 }]}>
        <Picker
          selectedValue={formData.genero}
          onValueChange={(value: string) => handleInputChange("genero", value)}
        >
          <Picker.Item label="Seleccionar género" value="" />
          <Picker.Item label="Macho" value="Macho" />
          <Picker.Item label="Hembra" value="Hembra" />
        </Picker>
      </View>

      {/* Descripción */}
      <View style={styles.textAreaContainer}>
        <TextInput
          placeholder="Descripción"
          style={styles.textArea}
          multiline
          numberOfLines={4}
          onChangeText={(text) => handleInputChange("descripcion", text.slice(0, 200))}
          value={formData.descripcion}
          maxLength={200}
        />
        <Text style={styles.characterCount}>
          {formData.descripcion.length}/200
        </Text>
      </View>

      {/* Correo de contacto */}
      <TextInput
        placeholder="Correo Electrónico de Contacto"
        style={styles.input}
        onChangeText={(text) => handleInputChange("contactoEmail", text)}
        value={formData.contactoEmail}
        keyboardType="email-address"
      />

      {/* Teléfono de contacto */}
      <TextInput
        placeholder="Número de Teléfono"
        style={styles.input}
        onChangeText={(text) =>
          handleInputChange("contactoTelefono", text.replace(/[^0-9]/g, ""))
        }
        value={formData.contactoTelefono}
        keyboardType="numeric"
        maxLength={9}
      />

      {/* Botón para publicar */}
      <Button title="Publicar" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imagePicker: {
    width: 150,
    height: 150,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imagePlaceholder: {
    color: "#999",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  textAreaContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 80,
  },
  characterCount: {
    alignSelf: "flex-end",
    color: "#999",
  },
  map: {
    flex: 1,
  },
});
