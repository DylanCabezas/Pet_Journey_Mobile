import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LocationScreen() {
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null,
	);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();

			if (status !== "granted") {
				setErrorMessage("Permission to access location was denied");
				return;
			}

			const location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.paragraph}>
				{errorMessage ? errorMessage : JSON.stringify(location)}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	paragraph: {
		fontSize: 18,
		textAlign: "center",
	},
});
