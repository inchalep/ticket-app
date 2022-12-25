import { extendTheme } from '@chakra-ui/react';
import { styles as globalStyle } from './globalStyle';

export const costomTheme = extendTheme({
  styles: {
    global: {
      ...globalStyle,
    },
  },
});

