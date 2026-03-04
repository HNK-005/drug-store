import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export async function takePhoto(): Promise<ImagePicker.ImagePickerResult | null> {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Cần có sự cho phép', 'Cần quyền truy cập Camera!');
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],

    quality: 0.5,
  });

  if (!result.canceled) {
    return result;
  }

  return null;
}
