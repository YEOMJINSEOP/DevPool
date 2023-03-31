import React from 'react';

type HeaderProps = {
  logo: string;
};

const Header = ({logo}: HeaderProps) => (
  <>
    <h2>HEADER {logo}</h2>
    <br />
  </>
);

export default Header;