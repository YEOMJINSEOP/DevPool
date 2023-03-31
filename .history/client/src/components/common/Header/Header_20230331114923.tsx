import React from 'react';

type HeaderProps = {
  logo: string;
};

const Header = ({logo}: HeaderProps) => (
  <h1>HEADER {logo}</h1>
);

export default Header;