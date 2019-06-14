import * as React from 'react';

// third party apps
import Select, { Option } from '@material/react-select';

// interfaces
import { SelectBoxProps } from './interfaces';

const SelectBox: React.SFC<SelectBoxProps> = (props) => {
  const [date, setDate] = React.useState('');
  const handleValueChange = (e: React.FormEvent<HTMLInputElement>) => {
    setDate(e.currentTarget.value);
  };

  return (
    <React.Fragment>
      {/*<Select*/}
        {/*enhanced*/}
        {/*label='Choose Dog'*/}
        {/*value={date}*/}
        {/*onEnhancedChange={handleValueChange}*/}
      {/*>*/}
        {/*<Option value='pomsky'>Pomsky</Option>*/}
        {/*<Option value='goldenDoodle'>Golden Doodle</Option>*/}
      {/*</Select>*/}
    </React.Fragment>
  );
};

export default SelectBox;
