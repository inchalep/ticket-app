import { extendTheme } from '@chakra-ui/react';
import { styles as globalStyle } from './globalStyle';

export const costomTheme = extendTheme({
  styles: {
    global: {
      ...globalStyle,
    },
  },
  colors:{
    trBg:'#daf1d5',
    closedTr:'#dddddd',
    headingBg:'#d6eef8',
  }
});

