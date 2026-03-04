import React from 'react';
import { Stack } from 'expo-router';

export default function MedicineLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Thuốc',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerTitle: 'Tạo thuốc mới',
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
}
