export const Colors = {
  primary: {
    50: '#E8EAFF',
    100: '#C0CCFF',
    200: '#99ADFF',
    300: '#708DFF',
    400: '#4A6EFF',
    500: '#254EFF', // primary color
    600: '#1A45FF',
    700: '#0F3AFA',
    800: '#052EF0',
    900: '#001EE6',
  },
  secondary: {
    50: '#F3E5FF',
    100: '#E1BCFE',
    200: '#CE93FD',
    300: '#B96AFB',
    400: '#A84BFA',
    500: '#9C2CF9', // secondary color
    600: '#8F26F7',
    700: '#8021F5',
    800: '#711CF2',
    900: '#6011EF',
  },
  accent: {
    50: '#F9E5FF',
    100: '#F0BCFE',
    200: '#E793FD',
    300: '#DE6AFB',
    400: '#D64BFA',
    500: '#CF2CF9', // accent color
    600: '#C826F7',
    700: '#C021F5',
    800: '#B71CF2',
    900: '#A711EF',
  },
  success: {
    50: '#E6F9E6',
    100: '#C2F1C2',
    200: '#9DE99D',
    300: '#78E178',
    400: '#53D953',
    500: '#2ED12E', // success color
    600: '#25C125',
    700: '#1CAD1C',
    800: '#149914',
    900: '#0C850C',
  },
  warning: {
    50: '#FFF8E1',
    100: '#FFECB3',
    200: '#FFE082',
    300: '#FFD54F',
    400: '#FFCA28',
    500: '#FFC107', // warning color
    600: '#FFB300',
    700: '#FFA000',
    800: '#FF8F00',
    900: '#FF6F00',
  },
  error: {
    50: '#FCE4E4',
    100: '#F9BCBC',
    200: '#F59090',
    300: '#F26464',
    400: '#EF4242',
    500: '#EB2121', // error color
    600: '#E81D1D',
    700: '#E41818',
    800: '#E11414',
    900: '#DB0B0B',
  },
  gray: {
    50: '#F7F7F7',
    100: '#E3E3E3',
    200: '#C8C8C8',
    300: '#A4A4A4',
    400: '#818181',
    500: '#666666',
    600: '#515151',
    700: '#434343',
    800: '#383838',
    900: '#181818',
  },
  dark: {
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    border: '#2C2C2C',
    notification: '#9C2CF9',
  },
  light: {
    background: '#FFFFFF',
    card: '#F7F7F7',
    text: '#121212',
    border: '#E3E3E3',
    notification: '#9C2CF9',
  },
};

export type ThemeType = 'light' | 'dark';

export function getThemeColors(theme: ThemeType) {
  return theme === 'light' ? Colors.light : Colors.dark;
}

export default Colors;