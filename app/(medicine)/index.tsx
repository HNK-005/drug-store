import React from 'react';
import { Pressable, View } from 'react-native';
import { SquarePlus } from 'lucide-react-native';

import { Redirect, Stack, useRouter } from 'expo-router';

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
import { Icon, MenuIcon } from '@/components/ui/icon';
import { SearchBar } from '@/components/SearchBar';

export default function MedicineIndex() {
  const router = useRouter();
  const [showActionsheet, setShowActionsheet] = React.useState(false);

  const handleOpen = () => setShowActionsheet(true);
  const handleClose = () => setShowActionsheet(false);

  const handleAddMedicine = () => {
    router.navigate('/(medicine)/create');
    handleClose();
  };

  return <Redirect href="/(medicine)/create" />;

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={handleOpen}>
              <Icon as={MenuIcon} size="xl" />
            </Pressable>
          ),
        }}
      />
      <View className="flex-1">
        <View className="p-2">
          <SearchBar size="xl" className="text-lg" placeholder="Nhập tên thuốc" />
        </View>
      </View>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={handleAddMedicine}>
            <ActionsheetIcon size="lg" as={SquarePlus} color="blue" />
            <ActionsheetItemText size="lg">Thêm thuốc</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText size="md">Đóng</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
}
