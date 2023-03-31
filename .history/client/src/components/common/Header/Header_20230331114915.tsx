import React from 'react';

type HeaderProps = {
  logo: string;
};

const Header = ({logo}: HeaderProps) => (
  <div>HEADER{logo}</div>
);

export default Header;