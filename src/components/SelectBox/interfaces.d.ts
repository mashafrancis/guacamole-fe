import * as React from 'react'
export interface SelectBoxProps {
    updateField: (field:string) => (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    fields: {
        [key: string]: ReactText
      };
}

