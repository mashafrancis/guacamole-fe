// react libraries
import * as React from 'react';

// styles
import './TextField.scss';

// interfaces
import { TextFieldProps } from './interfaces';

// helper functions
import classNameFormatter from 'utils/helpers/classNameFormatter';

const TextField: React.SFC<TextFieldProps> = ({
  outlined,
  ...props
}) => {
  const classes = classNameFormatter(
    {
      'mdc-text-field--outlined': outlined,
    }
  );

  return (
    <div
      className={
        classNameFormatter(
          {
            'mdc-text-field': outlined,
          },
          props.className
        )
      }
    >
      {
      <input
          { ...props }
          className={classes}
        />
      }
    </div>
  );
};

TextField.defaultProps = {
  type: 'text',
  value: '',
};

export default TextField;
