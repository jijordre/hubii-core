import { createSelector } from 'reselect';
import { fromJS, List } from 'immutable';
import BigNumber from 'bignumber.js';
import { makeSelectCurrentNetwork } from 'containers/App/selectors';
import { makeSelectCurrentWallet } from 'containers/WalletHoc/selectors';
import { from } from 'nahmii-sdk/lib/monetary-amount';

import {
  makeSelectPrices,
  makeSelectSupportedAssets,
} from 'containers/HubiiApiHoc/selectors';

/**
 * Direct selector to the nahmiiHoc state domain
 */
const selectNahmiiHocDomain = (state) => state.get('nahmiiHoc');

const makeSelectReceipts = () => createSelector(
  selectNahmiiHocDomain,
  (nahmiiHocDomain) => nahmiiHocDomain.get('receipts')
);

const makeSelectReceiptsWithInfo = () => createSelector(
  makeSelectReceipts(),
  makeSelectSupportedAssets(),
  makeSelectPrices(),
  (receipts, supportedAssets, prices) => {
    // set all address's receipts to loading if don't have all required information
    let receiptsWithInfo = receipts;
    if
    (
      supportedAssets.get('loading') ||
      supportedAssets.get('error') ||
      prices.get('loading') ||
      prices.get('error')
    ) {
      receiptsWithInfo = receipts
        .map((address) => address
          .set('loading', true)
          .set('receipts', fromJS([])));
      return receiptsWithInfo;
    }

    receiptsWithInfo = receipts.map((addressObj, address) => {
      const addressReceiptsWithInfo = addressObj.get('receipts').reduce((result, receipt) => {
        let receiptWithInfo = receipt;
        // set currency to be consistent with other types of transaction
        if (receipt.getIn(['currency', 'ct']) === '0x0000000000000000000000000000000000000000') {
          receiptWithInfo = receiptWithInfo.set('currency', 'ETH');
        } else {
          receiptWithInfo = receiptWithInfo.set('currency', receiptWithInfo.getIn(['currency', 'ct']));
        }

        // try to locate the asset from supportedAssets
        const assetDetails = supportedAssets
          .get('assets')
          .find((a) => a.get('currency') === receiptWithInfo.get('currency'));

        // ignore unsupported assets
        if (!assetDetails) return result;

        // get receipt type
        const type = address.toLowerCase() === receipt.getIn(['sender', 'wallet']).toLowerCase() ?
                'sent' :
                'received';
        receiptWithInfo = receiptWithInfo.set('type', type);

        // get counterpartyAddress
        const counterpartyAddress = type === 'sent' ?
                receipt.getIn(['recipient', 'wallet']) :
                receipt.getIn(['sender', 'wallet']);
        receiptWithInfo = receiptWithInfo.set('counterpartyAddress', counterpartyAddress);

        // get currency symbol for this receipt
        const symbol = assetDetails.get('symbol');
        receiptWithInfo = receiptWithInfo.set('symbol', symbol);

        // get decimal amt for this receipt
        const decimals = assetDetails.get('decimals');
        const divisionFactor = new BigNumber('10').pow(decimals);
        const weiOrEquivilent = new BigNumber(receiptWithInfo.get('amount'));
        const decimalAmount = weiOrEquivilent.div(divisionFactor);
        BigNumber.config({ EXPONENTIAL_AT: 20 });
        receiptWithInfo = receiptWithInfo.set('decimalAmount', decimalAmount.toString());

        // get fiat value of this receipt
        const assetPrices = prices
            .get('assets')
            .find((a) => a.get('currency') === receiptWithInfo.get('currency'));
        const receiptFiatValue = new BigNumber(receiptWithInfo.get('decimalAmount')).times(assetPrices.get('usd'));
        receiptWithInfo = receiptWithInfo.set('fiatValue', receiptFiatValue.toString());

        // set 'confirmed' to true. when we add data from the payments endpoint, set the
        // conf status of those receipt to false.
        receiptWithInfo = receiptWithInfo.set('confirmed', true);

        // set blockNumber to a number instead of string
        receiptWithInfo = receiptWithInfo
          .set('blockNumber', parseInt(receiptWithInfo.get('blockNumber'), 10));

        // set layer
        receiptWithInfo = receiptWithInfo.set('layer', 'nahmii');

        // set timestamp
        receiptWithInfo = receiptWithInfo.set(
          'timestamp',
          receiptWithInfo.get('updated')
        );

        return result.push(receiptWithInfo);
      }, new List());

      return addressObj.set('receipts', addressReceiptsWithInfo);
    });

    return receiptsWithInfo;
  }
)

const makeSelectReceiptsByAddress = (address) => createSelector(
  makeSelectReceipts(),
  (receipts) => receipts.get(address) || fromJS([])
);

const makeSelectNahmiiWallets = () => createSelector(
  selectNahmiiHocDomain,
  (nahmiiHocDomain) => nahmiiHocDomain.get('wallets') || fromJS({})
);

const makeSelectWalletCurrency = () => createSelector(
  selectNahmiiHocDomain,
  (nahmiiHocDomain) => nahmiiHocDomain.get('selectedCurrency')
);

const makeSelectOngoingChallenges = () => createSelector(
  selectNahmiiHocDomain,
  (nahmiiHocDomain) => nahmiiHocDomain.get('ongoingChallenges')
);

const makeSelectSettleableChallenges = () => createSelector(
  selectNahmiiHocDomain,
  (nahmiiHocDomain) => nahmiiHocDomain.get('settleableChallenges')
);

const makeSelectNahmiiSettlementTransactions = () => createSelector(
  selectNahmiiHocDomain,
  (nahmiiHocDomain) => nahmiiHocDomain.get('transactions') || fromJS({})
);

const makeSelectOngoingChallengesForCurrentWalletCurrency = () => createSelector(
  makeSelectOngoingChallenges(),
  makeSelectCurrentWallet(),
  makeSelectWalletCurrency(),
  (ongoingChallenges, currentWallet, selectedCurrency) => {
    const address = currentWallet.get('address');
    const challenges = ongoingChallenges.getIn([address, selectedCurrency]);
    return challenges || fromJS({details: []});
  }
);

const makeSelectSettleableChallengesForCurrentWalletCurrency = () => createSelector(
  makeSelectSettleableChallenges(),
  makeSelectCurrentWallet(),
  makeSelectWalletCurrency(),
  (settleableChallenges, currentWallet, selectedCurrency) => {
    const address = currentWallet.get('address');
    const challenges = settleableChallenges.getIn([address, selectedCurrency]);
    return challenges || fromJS({details: []});
  }
);

const makeSelectLastPaymentChallenge = () => createSelector(
  makeSelectNahmiiWallets(),
  makeSelectCurrentWallet(),
  (nahmiiWallets, currentWallet) => {
    const address = currentWallet.get('address');
    const nahmiiWallet = nahmiiWallets.get(address);
    if (!nahmiiWallet) {
      return fromJS({});
    }
    return nahmiiWallet.get('lastPaymentChallenge') || fromJS({});
  }
);

const makeSelectLastPaymentChallengeByAddress = (address) => createSelector(
  makeSelectNahmiiWallets(),
  (nahmiiWallets) => {
    const nahmiiWallet = nahmiiWallets.get(address);
    if (!nahmiiWallet) {
      return fromJS({});
    }
    return nahmiiWallet.get('lastPaymentChallenge') || fromJS({});
  }
);

const makeSelectLastSettlePaymentDriip = () => createSelector(
  makeSelectNahmiiWallets(),
  makeSelectCurrentWallet(),
  (nahmiiWallets, currentWallet) => {
    const address = currentWallet.get('address');
    const nahmiiWallet = nahmiiWallets.get(address);
    if (!nahmiiWallet) {
      return fromJS({});
    }
    return nahmiiWallet.get('lastSettlePaymentDriip') || fromJS({});
  }
);

const makeSelectNahmiiBalancesByCurrentWallet = () => createSelector(
  makeSelectNahmiiBalances(),
  makeSelectCurrentWallet(),
  (nahmiiBalances, currentWallet) => {
    const address = currentWallet.get('address');
    const nahmiiBalance = nahmiiBalances.get(address);
    return nahmiiBalance || fromJS({});
  }
);

const makeSelectNahmiiSettlementTransactionsByCurrentWallet = () => createSelector(
  makeSelectNahmiiSettlementTransactions(),
  makeSelectCurrentWallet(),
  makeSelectCurrentNetwork(),
  (nahmiiSettlementTransactions, currentWallet, network) => {
    const address = currentWallet.get('address');
    const txs = nahmiiSettlementTransactions.get(address);
    const txsByCurrency = {};
    if (txs) {
      const _txs = txs.toJS();
      Object.keys(_txs).forEach((currency) => {
        txsByCurrency[currency] = [];
        Object.keys(_txs[currency]).forEach((hash) => {
          txsByCurrency[currency].push(_txs[currency][hash]);
        });
        txsByCurrency[currency]
          .filter((a) => a.network === network.provider.network.name)
          .sort((a, b) => b.createdAt - a.createdAt);
      });
    }
    return txsByCurrency;
  }
);

const makeSelectDepositStatus = () => createSelector(
  selectNahmiiHocDomain,
  (nahmiiHocDomain) => nahmiiHocDomain.get('depositStatus')
);

const makeSelectNahmiiBalances = () => createSelector(
  selectNahmiiHocDomain,
  (nahmiiHocDomain) => {
    const balances = nahmiiHocDomain.get('balances') || fromJS({});

    // create a 'total' balance entry for each address
    let balancesWithTotal = balances;
    balances.forEach((address, i) => {
      let total = fromJS({
        loading: false,
        error: false,
        assets: [],
      });
      total = address.toSetSeq().reduce((acc, cur) => {
        // if any are loading/erroed for this address set it's 'total' to loading/errored and 'assets' to none
        if (acc.get('loading') || acc.get('error')) return acc;
        if (cur.get('loading')) {
          return acc
            .set('loading', true)
            .set('assets', fromJS([]));
        }
        if (cur.get('error')) {
          return acc
            .set('error', 'someerror')
            .set('assets', fromJS([]));
        }

        let assets = acc.get('assets');
        for (let j = 0; j < cur.get('assets').size; j += 1) {
          const assetIndex = assets.findIndex((asset) => asset.get('currency') === cur.getIn(['assets', j, 'currency']));
          // asset not yet in total, add it
          if (assetIndex === -1) {
            assets = assets.push(cur.getIn(['assets', j]));
          } else {
            // asset in total, add to the balance
            assets = assets.setIn(
            [assetIndex, 'balance'],
            new BigNumber(assets.getIn([assetIndex, 'balance'])).plus(cur.getIn(['assets', j, 'balance'])).toString());
          }
        }
        return acc.set('assets', assets);
      }, total);
      balancesWithTotal = balancesWithTotal.setIn([i, 'total'], total);
    });
    return balancesWithTotal;
  }
);


export {
  makeSelectWalletCurrency,
  makeSelectReceipts,
  makeSelectReceiptsByAddress,
  makeSelectLastPaymentChallenge,
  makeSelectLastPaymentChallengeByAddress,
  makeSelectLastSettlePaymentDriip,
  makeSelectNahmiiBalances,
  makeSelectNahmiiBalancesByCurrentWallet,
  makeSelectNahmiiSettlementTransactionsByCurrentWallet,
  makeSelectReceiptsWithInfo,
  makeSelectDepositStatus,
  makeSelectOngoingChallengesForCurrentWalletCurrency,
  makeSelectSettleableChallengesForCurrentWalletCurrency,
};
