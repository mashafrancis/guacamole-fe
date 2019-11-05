import * as React from 'react';

// third party apps
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { countries } from 'countries-list';
import { CountryRegionData } from 'react-country-region-selector';

// styles
import {
  createMuiTheme,
  createStyles,
  Grid, ListItem,
  ListItemText,
  makeStyles,
  Theme
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { SelectBoxProps } from './interfaces';
import './SelectBox.scss';

const formatCountriesData = (countries: object) => {
  const countryList = [];
  const getRegions = (country: string) => {
    if (!country) {
      return [];
    }
    return country[2].split('|').map((regionPair) => {
      const [regionName, regionShortCode = null] = regionPair.split('~');
      return regionName;
    });
  };
  for (const country in countries) {
    if (countries.hasOwnProperty(country)) {
      const element = countries[country];
      countryList.push(
        Object.defineProperty(element, 'regions', {
          value: getRegions(CountryRegionData.find(
            country => (country[0] === element.name))),
          enumerable: true,
          configurable: true,
        }));
    }
  }
  // return only countries with regions available

  return countryList.filter(
    country => (country.regions.length > 0)
  ).sort( // sort by country name
    (a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }
  );
};

export const SelectCountryRegionBox: React.FunctionComponent<SelectBoxProps> =  (props) => {
  const { fields, updateField, location } = props;
  const label = location === 'origin' ? 'Origin' : 'Destination';
  const countriesData = formatCountriesData(countries);
  const regionsData = React.useMemo(
    () => {
      // tslint:disable-next-line:prefer-array-literal
      return function (name: string): Array<string> {
        return countriesData.find(
          country => (country.name === name)
        ).regions;
      }(fields.country);
    }, [fields.country]
  );

  const useStyles = makeStyles((theme: Theme) => createStyles({
    focused: {},
    listItemPadding: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    selectHeight: {
      height: '1.25em',
    },
    labelColor: {
      '&$focused': {
        color: `rgba(${25},${103},${210},${0.87})`,
      },
    },
  }));

  const theme = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        root: {
          '&.Mui-focused fieldset': {
            borderColor: `rgba(${25},${103},${210},${0.87}) !important`,
          },
        },
      },
      MuiIcon: {
        colorPrimary: {
          color: `rgba(${0}, ${0}, ${0}, ${0.54})`,
        },
      },
      MuiListItem: {
        root: {
          top: -5,
        },
      },
    },
  });

  const styles = useStyles(props);
  return (
      <Grid container spacing={2} direction="row">
        <ThemeProvider theme={theme}>
          <Grid item xs>
            <TextField
              select
              variant="outlined"
              label={label}
              fullWidth
              value={fields.country}
              onChange={updateField(location, 'country')}
              helperText={<span
                className="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg
                mdc-text-field-helper-text--persistent
                mdc-text-field-helper-text--validation-msg"/>}
              SelectProps={{
                classes: {
                  selectMenu: styles.selectHeight,
                },
              }}
              InputLabelProps={{
                classes: {
                  focused: styles.focused,
                  root: styles.labelColor,
                },
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <Icon color="primary">place</Icon>
                </InputAdornment>,
              }}>
              {countriesData.map(country => (
                  <MenuItem key={country.name} value={country.name}>
                    <ListItem component="div" classes={{ root: styles.listItemPadding }} alignItems="center">
                      <ListItemText primary={country.name} />
                    </ListItem>
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs>
            <TextField
              select
              fullWidth
              variant="outlined"
              label="City"
              value={fields.region}
              onChange={updateField(location, 'region')}
              helperText={<span
                className="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg
                mdc-text-field-helper-text--persistent
                mdc-text-field-helper-text--validation-msg"/>}
              InputLabelProps={{
                classes: {
                  focused: styles.focused,
                  root: styles.labelColor,
                },
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <Icon color="primary">place</Icon>
                </InputAdornment>,
              }}>
              {regionsData.map(
                region => (
                  <MenuItem key={region} value={region}>
                    {region}
                </MenuItem>
                )
              )}
            </TextField>
          </Grid>
        </ThemeProvider>
      </Grid>
  );
};
