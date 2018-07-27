/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { compose } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { getAbsolutePath } from 'utils/electron';
import injectSaga from 'utils/injectSaga';

import HomeScreen from 'components/HomeScreen';
import SideBar from 'components/SideBar';
import Striim from 'containers/Striim';
import WalletManager from 'containers/WalletManager';
import WalletDetails from 'containers/WalletDetails';
import Settings from 'containers/Settings';

import withExchangeRate from 'containers/ExchangeRateHOC';
import WalletHOC from 'containers/WalletHOC';

import saga from './saga';

export function App() {
  const menuItems = [
    {
      to: '/wallets',
      icon: 'wallet',
      name: 'Wallet Manager',
    },
    {
      to: '/striim',
      icon: 'striim',
      name: 'striim detail',
    },
    {
      to: '/dex',
      icon: 'dex',
      name: 'dex detail',
    },
  ];
  return (
    <SideBar menuItems={menuItems} logoSrc={getAbsolutePath('public/images/hubii-core-logo.svg')}>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/wallets" component={WalletManager} />
        <Route path="/wallet/:address" component={WalletDetails} />
        <Route path="/striim" component={Striim} />
        <Route path="/settings" component={Settings} />
        <Redirect from="/" to="/wallets" />
      </Switch>
    </SideBar>
  );
}

const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withSaga,
  withExchangeRate,
  WalletHOC,
)(App);
