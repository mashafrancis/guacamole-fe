import * as React from 'react';

export interface MenuProps {
  primaryText: string;
  component: any; /* TODO: Fix type */
  icon: string;
}

export interface BottomMenuProps {
  label: string;
  icon: any;
  value: string;
}
