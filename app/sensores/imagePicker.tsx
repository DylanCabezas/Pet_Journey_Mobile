import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Button, Image, View } from "react-native";

export default function ImagePickerScreen() {
	const [image, setImage] = useState<string | null>(null);

	async function pickImage() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	}

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				gap: 50,
			}}
		>
			<Button title="Pick an image from camera roll" onPress={pickImage} />
			{image && (
				<Image
					source={{ uri: image }}
					style={{
						width: 200,
						height: 200,
					}}
				/>
			)}
		</View>
	);
}
