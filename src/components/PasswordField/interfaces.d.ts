import * as React from 'react';

export interface PasswordFieldProps {
  validator?: any;
  label?: string;
  id: string;
  placeholder: string;
  required?: boolean;
  children?: React.ReactNode;
  onStateChanged?: any;
  type?: string;
  minStrength?: number;
  thresholdLength?: number;
}

export interface PasswordFieldState {
  password: string;
  strength: number;
  isPasswordHidden: boolean;
}
