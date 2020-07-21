import { useDispatch } from 'react-redux';

export const UPDATE_THEME = 'UPDATE_THEME';
export const UPDATE_COLOR = 'UPDATE_COLOR';

export const useUpdateThemeMode = () => {
  const dispatch = useDispatch();
  return (theme: string) => {
    let settings = localStorage.getItem('settings');
    if (settings) {
      let parsedSetting = JSON.parse(settings);
      localStorage.setItem(
        'settings',
        JSON.stringify({ ...parsedSetting, theme: theme })
      );
      dispatch({
        type: UPDATE_THEME,
        payload: theme,
      });
    } else {
      localStorage.setItem(
        'settings',
        JSON.stringify({ theme: theme, color: '#0084ff' })
      );

      dispatch({
        type: UPDATE_THEME,
        payload: theme,
      });
    }
  };
};

export const useUpdateColor = () => {
  const dispatch = useDispatch();
  return (color: string) => {
    let settings = localStorage.getItem('settings');
    if (settings) {
      let parsedSetting = JSON.parse(settings);
      localStorage.setItem(
        'settings',
        JSON.stringify({ ...parsedSetting, color: color })
      );
      dispatch({
        type: UPDATE_COLOR,
        payload: color,
      });
    } else {
      localStorage.setItem(
        'settings',
        JSON.stringify({ theme: 'light', color: color })
      );

      dispatch({
        type: UPDATE_COLOR,
        payload: color,
      });
    }
  };
};
