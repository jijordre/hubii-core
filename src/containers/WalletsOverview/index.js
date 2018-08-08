import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'antd';

import { getBreakdown } from 'utils/wallet';

import { deleteWallet, showDecryptWalletModal, setCurrentWallet } from 'containers/WalletHOC/actions';
import {
  makeSelectLedgerNanoSInfo,
  makeSelectSupportedAssets,
  makeSelectTotalBalances,
  makeSelectWalletsWithInfo,
} from 'containers/WalletHOC/selectors';

import { SectionHeading } from 'components/ui/SectionHeading';
import WalletItemCard from 'components/WalletItemCard';
import Breakdown from 'components/Breakdown';

import { WalletCardsCol, Wrapper, WalletPlaceHolder } from './style';

export class WalletsOverview extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(...args) {
    super(...args);
    this.renderWalletCards = this.renderWalletCards.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick(card) {
    const { history } = this.props;
    history.push(`/wallet/${card.address}`);
  }


  renderWalletCards() {
    const wallets = this.props.walletsWithInfo.toJS();
    if (wallets.length === 0) {
      return (
        <WalletPlaceHolder>
          {"You haven't added any wallets."}
          <br />
          <br />
          {'Create or import a wallet by clicking "Add / Restore Wallet" in the top right.'}
        </WalletPlaceHolder>
      );
    }
    return wallets.map((wallet) => (
      <WalletCardsCol
        span={12}
        key={wallet.name}
        xs={24}
        sm={24}
        lg={12}
      >
        <WalletItemCard
          name={wallet.name}
          totalBalance={(wallet.balances.loading || wallet.balances.error) ? 0 : wallet.balances.total.usd.toNumber()}
          balancesLoading={wallet.balances.loading}
          balancesError={!!wallet.balances.error}
          address={wallet.address}
          type={wallet.type}
          connected={wallet.type === 'lns' ? this.props.ledgerNanoSInfo.get('id') === wallet.deviceId : null}
          assets={wallet.balances.assets}
          mnemonic={wallet.mnemonic}
          privateKey={wallet.decrypted ? wallet.decrypted.privateKey : null}
          isDecrypted={!!wallet.decrypted}
          showDecryptWalletModal={() => this.props.showDecryptWalletModal()}
          setCurrentWallet={() => this.props.setCurrentWallet(wallet.address)}
          handleCardClick={() => this.handleCardClick(wallet)}
          walletList={wallets}
          deleteWallet={() => this.props.deleteWallet(wallet.address)}
        />
      </WalletCardsCol>
    ));
  }

  render() {
    const { totalBalances, supportedAssets } = this.props;
    return (
      <Wrapper>
        <Row gutter={16}>
          <Col span={16} xs={24} md={16}>
            <SectionHeading>All Wallets</SectionHeading>
            <Row type="flex" align="top" gutter={16}>
              {this.renderWalletCards()}
            </Row>
          </Col>
          <Col span={8} xs={24} md={8}>
            {
              <Breakdown
                data={getBreakdown(totalBalances, supportedAssets)}
                value={(+this.props.totalBalances.getIn(['total', 'usd']).toFixed(6)).toString()}
              />
            }
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

WalletsOverview.propTypes = {
  showDecryptWalletModal: PropTypes.func.isRequired,
  setCurrentWallet: PropTypes.func.isRequired,
  deleteWallet: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  ledgerNanoSInfo: PropTypes.object.isRequired,
  totalBalances: PropTypes.object.isRequired,
  supportedAssets: PropTypes.object.isRequired,
  walletsWithInfo: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  walletsWithInfo: makeSelectWalletsWithInfo(),
  totalBalances: makeSelectTotalBalances(),
  supportedAssets: makeSelectSupportedAssets(),
  ledgerNanoSInfo: makeSelectLedgerNanoSInfo(),
});

export function mapDispatchToProps(dispatch) {
  return {
    deleteWallet: (...args) => dispatch(deleteWallet(...args)),
    showDecryptWalletModal: (...args) => dispatch(showDecryptWalletModal(...args)),
    setCurrentWallet: (...args) => dispatch(setCurrentWallet(...args)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(WalletsOverview);
