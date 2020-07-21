import React from 'react';
import {
  Grid,
  Switch,
  Paper,
  Select,
  MenuItem,
  Tooltip,
} from '@material-ui/core';
import style from './settingsBlock.module.css';
import Wrapper from 'Components/Wrapper/Wrapper';

import { State } from 'Redusers/rootReducer';
import { useSelector } from 'react-redux';
import {
  useUpdateThemeMode,
  useUpdateColor,
} from 'Redusers/Settings/settingsActions';
import { colors } from 'Redusers/Settings/typesSettings';

const SettingsBlock = () => {
  const theme = useSelector((state: State) => state.setting.theme);
  const color = useSelector((state: State) => state.setting.color);

  const updateColor = useUpdateColor();
  const updateThemeMode = useUpdateThemeMode();
  return (
    <Wrapper className={style.settingsWrapper}>
      <Paper className={style.settingsBlock}>
        <Grid container spacing={1} justify='space-between' alignItems='center'>
          <Grid
            component='label'
            container
            item
            xs={9}
            spacing={2}
            alignItems='center'
          >
            <Grid item>Ligth</Grid>
            <Grid item>
              <Switch
                checked={theme === 'dark'} // true = black theme
                color='primary'
                onChange={(event) =>
                  updateThemeMode(event.target.checked ? 'dark' : 'light')
                }
              />
            </Grid>
            <Grid item>Dark</Grid>
          </Grid>
          <Select
            className={style.select}
            MenuProps={{
              classes: {
                list: style.selectColor,
              },
            }}
            classes={{ root: style.selectRoot }}
            value={color}
            onChange={(event) => updateColor(String(event.target.value))}
          >
            {colors.map((el) => (
              <MenuItem key={el.hex} value={el.hex} className={style.menuItem}>
                <Tooltip title={el.name}>
                  <svg height='50' width='50'>
                    <circle cx='25' cy='25' r='20' className={el.name} />
                  </svg>
                </Tooltip>
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Paper>
    </Wrapper>
  );
};

export default SettingsBlock;
