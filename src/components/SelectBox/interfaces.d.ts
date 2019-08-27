import * as React from 'react'
export interface SelectBoxProps {
    updateField: (location: "origin" | "destination", field:string) => (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    fields: {
        [key: string]: ReactText
      };
    location: "origin" | "destination"
}

