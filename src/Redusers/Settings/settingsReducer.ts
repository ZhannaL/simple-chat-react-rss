import { UPDATE_THEME, UPDATE_COLOR } from './settingsActions';
import { ThemeMode } from './typesSettings';

type SettingsState = { theme: ThemeMode; color: string };

let settings = localStorage.getItem('settings');
let defaultSettings = settings
  ? JSON.parse(settings)
  : { theme: 'light', color: '#0084ff' };
const defaultSettingsState = { ...defaultSettings };

export const settingReducer = (
  state: SettingsState = defaultSettingsState,
  action: any
): SettingsState => {
  switch (action.type) {
    case UPDATE_THEME:
      if (!state) return state;
      return {
        ...state,
        theme: action.payload,
      };
    case UPDATE_COLOR:
      if (!state) return state;
      return {
        ...state,
        color: action.payload,
      };
    default:
      return state;
  }
};
