import * as React from 'react';

export const MenuContext = React.createContext({
  isOpen: false,
  selectedIndex: {
    group: 0,
    item: 0,
  },
  setOpen: (_open: boolean) => {},
  setSelectedIndex: (_selectedIndex: {group: number, item: number}) => {},
  logoutUser: () => null,
});

export const UserContext = React.createContext({
  name: '',
  photo: '',
});
