import * as React from 'react';

// styles
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// components
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// interfaces
import { SelectLuggageSpaceProps } from './interfaces';

export const SelectLuggageSpace: React.FunctionComponent<SelectLuggageSpaceProps> =  (props) => {
  const { fields, updateField } = props;
  const [values, setValues] = React.useState({
    space: '',
    name: 'hai',
  });

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  },              []);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        minWidth: 200,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    })
  );

  const classes = useStyles(props);

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
          Space Available
        </InputLabel>
        <Select
          className="mdc-text-field--fullwidth"
          value={fields}
          onChange={updateField}
          labelWidth={labelWidth}
          inputProps={{
            name: 'space',
            id: 'outlined-age-simple',
          }}
        >
          <MenuItem value={0}>None (0)</MenuItem>
          <MenuItem value={10}>Ten (10)</MenuItem>
          <MenuItem value={20}>Twenty (20)</MenuItem>
          <MenuItem value={30}>Thirty (30)</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
};
