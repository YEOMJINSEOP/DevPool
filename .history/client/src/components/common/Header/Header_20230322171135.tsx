import React from 'react';

type HeaderProps = {
  name: string;
};

const Header = ({name}: HeaderProps) => (
  <div>Hello, {name}</div>
);

Header.defaultProps = {
  mark: '!'
};

export default Header;