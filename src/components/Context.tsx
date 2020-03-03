import * as React from 'react';

const selectedIndex = JSON.parse(window.localStorage.getItem('selectedIndex'));

export const MenuContext = React.createContext({
  isOpen: false,
  selectedIndex: {
    group: selectedIndex === null || undefined || false ? 0 : selectedIndex.group,
    item: selectedIndex === null || undefined || false ? 0 : selectedIndex.item,
  },
  setOpen: (_open: boolean) => {},
  setSelectedIndex: (_selectedIndex: {group: number, item: number}) => {},
  logoutUser: () => null,
});

export const UserContext = React.createContext({
  name: '',
  photo: '',
});

export const ViewportContext = React.createContext({
  width: 0,
  height: 0,
});
