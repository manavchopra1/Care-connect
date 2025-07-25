/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import Colors from '../constants/Colors';
import { useColorScheme } from './useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors['light']
) {
  const theme = useColorScheme() ?? 'light';
  if (props[theme]) {
    return props[theme]!;
  } else {
    return Colors[theme][colorName];
  }
}
