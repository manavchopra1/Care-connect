/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#5B9BD5';
const tintColorDark = '#7BB3E6';

export default {
  light: {
    text: '#222',
    background: '#F8F9FB',
    card: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    border: '#eee',
    error: '#F44336',
    success: '#4CAF50',
  },
  dark: {
    text: '#fff',
    background: '#181A20',
    card: '#23242a',
    tint: tintColorDark,
    tabIconDefault: '#888',
    tabIconSelected: tintColorDark,
    border: '#333',
    error: '#F44336',
    success: '#4CAF50',
  },
};
