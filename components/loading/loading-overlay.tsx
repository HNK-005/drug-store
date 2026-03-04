import React from 'react';
import { Box } from '@/components/ui/box';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  transparent?: boolean;
}

export const LoadingOverlay = ({
  isVisible,
  message = 'Đang xử lý...',
  transparent = false,
}: LoadingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <Box
      className={`absolute bottom-0 left-0 right-0 top-0 z-50 items-center justify-center ${
        transparent ? 'bg-transparent' : 'bg-background-950/40' // Nền đen mờ 40%
      }`}>
      <VStack
        space="md"
        className="items-center justify-center rounded-xl bg-background-0 p-6 shadow-hard-2">
        <Spinner size="large" className="text-primary-500" />
        {message && <Text className="font-medium text-typography-900">{message}</Text>}
      </VStack>
    </Box>
  );
};
