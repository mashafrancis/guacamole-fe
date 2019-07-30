import * as React from 'react';
import MaterialIcon from '@material/react-material-icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { CountryRegionData } from "react-country-region-selector";
import { countries } from "countries-list";
import Icon from '@material-ui/core/Icon'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';

// style
import './SelectBox.scss'
import { SelectBoxProps } from './interfaces';


const formatCountriesData = (countries:object) =>{
  let countryList = []
  const getRegions = (country:string) => {
    if (!country) {
      return [];
    }
    return country[2].split("|").map(regionPair => {
      let [regionName, regionShortCode = null] = regionPair.split("~");
      return regionName;
    });
  };
  for (const country in countries) {
    if (countries.hasOwnProperty(country)) {
      const element = countries[country];
      countryList.push(
        Object.defineProperty(element,'regions',{
          value: getRegions(CountryRegionData.find(
            country=>(country[0] == element.name))),
          enumerable:true,
          configurable: true
        }))      
    }
  }
  // return only countries with regions available
  
  return countryList.filter(
    country=>(country.regions.length > 0)
  ).sort( // sort by country name
    (a, b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }
  )
}



export const SelectCountryRegionBox:React.FunctionComponent<SelectBoxProps> =  props =>{
  const { fields, updateField } = props
  const countriesData = formatCountriesData(countries)
  const regionsData = React.useMemo(
    ()=> function (name:string):Array<string> {
      return countriesData.find(
        country=>(country.name == name)
      ).regions
      }(fields['country']), [fields['country']]
  )
  
  
  return (
    <React.Fragment>
      <TextField
        select
        className="mdc-text-field--fullwidth"
        variant="outlined"
        label="Country"
        value={fields['country']}
        onChange={updateField("country")}
        helperText={<span
          className="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg 
          mdc-text-field-helper-text--persistent 
          mdc-text-field-helper-text--validation-msg"></span>} 
        InputProps={{
          startAdornment: <InputAdornment position="start">
            <MaterialIcon 
              role="button" 
              icon="place" 
              className="location-icon" 
              initRipple={null}/>
          </InputAdornment>
        }}>
        {countriesData.map(country => (
          <MenuItem key={country.name} value={country.name}>
            <ListItemIcon>
              <Icon>{country.emoji}</Icon>
            </ListItemIcon>
            <Typography variant="inherit">{country.name}</Typography>
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        className="mdc-text-field--fullwidth"
        variant="outlined"  
        label="City"
        value={fields['region']}
        onChange={updateField("region")}
        helperText={<span
          className="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg 
          mdc-text-field-helper-text--persistent 
          mdc-text-field-helper-text--validation-msg"></span>} 
        InputProps={{
          startAdornment: <InputAdornment position="start">
            <MaterialIcon 
              role="button" 
              icon="place" 
              className="location-icon" 
              initRipple={null}/>
          </InputAdornment>
        }}>
        {regionsData.map(
          region=>(
            <MenuItem key={region} value={region}>
              {region}
          </MenuItem>
          )
        )}
      </TextField>
    </React.Fragment>
  );
}

