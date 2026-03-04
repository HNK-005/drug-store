import { Pressable } from '@/components/ui/pressable';
import { Icon } from '@/components/ui/icon';
import { Box } from '@/components/ui/box';
import { MoonIcon, SunIcon } from 'lucide-react-native';
import Animated, { LayoutAnimationConfig, ZoomInRotate } from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDark = colorScheme === 'dark';

  return (
    <LayoutAnimationConfig skipEntering>
      <Animated.View
        key={`toggle-${colorScheme}`}
        entering={ZoomInRotate}
        style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Pressable onPress={toggleColorScheme} className="rounded-full p-2 active:opacity-50">
          <Box>
            <Icon
              as={isDark ? MoonIcon : SunIcon}
              size="xl"
              className={isDark ? 'text-primary-400' : 'text-primary-500'}
            />
          </Box>
        </Pressable>
      </Animated.View>
    </LayoutAnimationConfig>
  );
}
