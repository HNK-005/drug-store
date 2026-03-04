import React, { PropsWithChildren } from 'react';
import { takePhoto } from './take-photo';
import { pickImage } from './pick-image';

import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  ActionsheetIcon,
} from '@/components/ui/actionsheet';
import { ImageContext } from './image-context';
import { CameraIcon, Image } from 'lucide-react-native';
import { saveImage } from './save-image';

function Provider(props: PropsWithChildren) {
  const [imageUri, setImageUri] = React.useState<string | null>(null);
  const [showActionsheet, setShowActionsheet] = React.useState(false);

  const handleClose = () => setShowActionsheet(false);
  const handleOpen = () => setShowActionsheet(true);
  const handleReset = () => setImageUri(null);

  const handlePickImage = async () => {
    handleOpen();
    try {
      const image = await pickImage();
      if (image && image.assets && image.assets.length > 0) {
        setImageUri(image.assets[0].uri);
        handleClose();
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleTakePhoto = async () => {
    handleOpen();
    try {
      const photo = await takePhoto();
      if (photo && photo.assets && photo.assets.length > 0) {
        setImageUri(photo.assets[0].uri);
        handleClose();
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  const handleSaveImage = async (uri: string) => {
    try {
      return await saveImage(uri);
    } catch (error) {
      console.error('Error saving image:', error);
      return null;
    }
  };

  return (
    <>
      <ImageContext.Provider
        value={{ imageUri, open: handleOpen, saveImage: handleSaveImage, reset: handleReset }}>
        {props.children}
      </ImageContext.Provider>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={handlePickImage}>
            <ActionsheetIcon size="lg" as={Image} />
            <ActionsheetItemText size="lg">Chọn ảnh từ thư viện</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleTakePhoto}>
            <ActionsheetIcon size="lg" as={CameraIcon} />
            <ActionsheetItemText size="lg">Chụp ảnh</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText size="md">Đóng</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
}

export default function ImageProvider(props: PropsWithChildren) {
  return <Provider>{props.children}</Provider>;
}
