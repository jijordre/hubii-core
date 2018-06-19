import { Icon, Dropdown, Popover } from 'antd';
import * as React from 'react';
import PropTypes from 'prop-types';
import WalletDetailPopoverContent from './WalletDetailPopoverContent';
import AssetAmountBubble from './AssetAmountBubble';
import {
  AssetsWrapper,
  AssetWrapper,
  CardIcon,
  LeftSideWrapper,
  TotalBalance,
  OuterWrapper,
  IconMenu as Menu,
  MenuItem,
  MenuDivider,
  CardIconSettings,
} from './WalletItemCard.style';

/**
 * This component shows details of a wallet in the card.
 */

const settingsMenu = () => (
  <Menu>
    <MenuItem>Export Seed Words</MenuItem>
    <MenuDivider />
    <MenuItem>Export Password</MenuItem>
    <MenuDivider />
    <MenuItem>Delete Wallet</MenuItem>
  </Menu>
);

const WalletItemCard = (props) => (
  <div>
    <OuterWrapper>
      <LeftSideWrapper>
        <p>{props.name}</p>
        <AssetsWrapper>
          {props.assets &&
            props.assets.map((asset) => (
              <AssetWrapper key={asset.name}>
                <AssetAmountBubble name={asset.name} amount={asset.amount} />
              </AssetWrapper>
            ))}
        </AssetsWrapper>
      </LeftSideWrapper>
      <TotalBalance>{`$${props.totalBalance}`}</TotalBalance>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardIcon>
          <Popover
            placement="right"
            trigger="hover"
            content={
              <WalletDetailPopoverContent
                address={props.primaryAddress}
                type={props.type}
              />
            }
          >
            <Icon type="info-circle-o" />
          </Popover>
        </CardIcon>
        <CardIconSettings>
          <Dropdown
            placement="bottomLeft"
            overlay={settingsMenu(props.primaryAddress)}
          >
            <Icon type="setting" />
          </Dropdown>
        </CardIconSettings>
      </div>
    </OuterWrapper>
  </div>
);

WalletItemCard.propTypes = {
  /**
   * name of the wallet.
   */
  name: PropTypes.string.isRequired,
  /**
   * total Balance of the wallet.
   */
  totalBalance: PropTypes.number.isRequired,
  /**
   * assets/coins in a wallet.
   */
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      amount: PropTypes.number,
    })
  ),
  /**
   * primary Address of the wallet.
   */
  primaryAddress: PropTypes.string.isRequired,
  /**
   * props.type type of the wallet.
   */
  type: PropTypes.string.isRequired,
};

export default WalletItemCard;