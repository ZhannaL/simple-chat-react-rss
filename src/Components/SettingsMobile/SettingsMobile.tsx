import React, { useState } from 'react';
import {
  Grid,
  Switch,
  Select,
  MenuItem,
  Tooltip,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@material-ui/core';
import style from './settingsMobile.module.css';
import Wrapper from 'Components/Wrapper/Wrapper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { State } from 'Redusers/rootReducer';
import { useSelector } from 'react-redux';
import {
  useUpdateThemeMode,
  useUpdateColor,
} from 'Redusers/Settings/settingsActions';
import { colors } from 'Redusers/Settings/typesSettings';

const SettingsMobile = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const theme = useSelector((state: State) => state.setting.theme);
  const color = useSelector((state: State) => state.setting.color);

  const updateColor = useUpdateColor();
  const updateThemeMode = useUpdateThemeMode();
  return (
    <Wrapper className={style.settingsMobileWrapper}>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>General settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            component='label'
            spacing={1}
            justify='space-between'
            alignItems='center'
          >
            <Grid container item xs={9} spacing={2} alignItems='center'>
              <Grid item>
                <Switch
                  checked={theme === 'dark'} // true = black theme
                  color='primary'
                  onChange={(event) =>
                    updateThemeMode(event.target.checked ? 'dark' : 'light')
                  }
                />
              </Grid>
              <Grid item>DARK</Grid>
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
                <MenuItem
                  key={el.hex}
                  value={el.hex}
                  className={style.menuItem}
                >
                  <Tooltip title={el.name}>
                    <svg height='50' width='50'>
                      <circle cx='25' cy='25' r='20' className={el.name} />
                    </svg>
                  </Tooltip>
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Wrapper>
  );
};

export default SettingsMobile;
