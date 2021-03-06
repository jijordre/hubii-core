import * as React from 'react';
import PropTypes from 'prop-types';
import { HomeIcon, StyledLink } from './style';

/**
 * The WalletHeaderIcon Component
 */

const WalletHeaderIcon = (props) => (
  <StyledLink onClick={props.onIconClick}>
    <HomeIcon type={props.iconType} className="icon-home" />
  </StyledLink>
);
WalletHeaderIcon.propTypes = {
  /**
   * Icon to be shown
   */
  iconType: PropTypes.string,
  onIconClick: PropTypes.func,
};

export default WalletHeaderIcon;
