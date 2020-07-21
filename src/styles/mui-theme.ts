import { createMuiTheme } from '@material-ui/core/styles';
import { State } from 'Redusers/rootReducer';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export const useTheme = () => {
  const themeMode = useSelector((state: State) => state.setting.theme);
  const color = useSelector((state: State) => state.setting.color);

  const theme = useMemo(() => {
    return createMuiTheme({
      palette: {
        type: themeMode,
        primary: {
          main: color,
        },
      },
    });
  }, [themeMode, color]);

  return theme;
};
