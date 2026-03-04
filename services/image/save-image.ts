import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

export async function saveImage(uri: string): Promise<string | null> {
  const { status } = await MediaLibrary.requestPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert('Cần có sự cho phép', 'Chúng tôi cần quyền truy cập thư viện để lưu ảnh!');
    return null;
  }

  try {
    const asset = await MediaLibrary.createAssetAsync(uri);

    const albumName = 'DrugStore';
    const album = await MediaLibrary.getAlbumAsync(albumName);

    if (album === null) {
      await MediaLibrary.createAlbumAsync(albumName, asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }
    return asset.uri;
  } catch (error) {
    console.error(error);
    return null;
  }
}
