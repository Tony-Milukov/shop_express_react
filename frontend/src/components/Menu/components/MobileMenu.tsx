import React, { FC } from 'react';
import Menu from './Menu';
import "../menu.css"
interface IMobileMenuProps {
  isMobileMenuOpen: boolean,
  handleMobileMenu: () => any,
}
const MobileMenu:FC <IMobileMenuProps> = ({isMobileMenuOpen, handleMobileMenu,}) => {
  return (
      isMobileMenuOpen ? <div className={"mobileMenu"}>
        <Menu/>
      </div>: null
  );
};

export default MobileMenu;
