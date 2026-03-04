import { Stack } from 'expo-router';
import { Alert } from 'react-native';

import { Form } from '@/components/form/medicine';
import { MedicineFormOutput } from '@/components/form/medicine/validate';
import { ThemeToggle } from '@/components/ThemeToggle';

import ImageProvider from '@/services/image/image-provider';
import { createNewMedicine } from '@/services/medicine';

export default function MedicineCreate() {
  const handleSubmit = async (data: MedicineFormOutput) => {
    try {
      await createNewMedicine(data);
      Alert.alert('Thành công', 'Thuốc đã được tạo thành công!');
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Đã có lỗi xảy ra khi tạo thuốc. Vui lòng thử lại!');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerRight: () => <ThemeToggle /> }} />
      <ImageProvider>
        <Form onSubmit={handleSubmit} onSuccess={async (reset) => reset()} />
      </ImageProvider>
    </>
  );
}
