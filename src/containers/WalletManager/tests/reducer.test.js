
import { fromJS } from 'immutable';
import walletManagerReducer from '../reducer';
import {
  createNewWallet,
  createNewWalletFailed,
  createNewWalletSuccess,
  decryptWallet,
  decryptWalletFailed,
  decryptWalletSuccess,
  loadWalletsSuccess,
  loadWalletBalances,
  loadWalletBalancesSuccess,
  loadWalletBalancesError,
} from '../actions';
describe('walletManagerReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      selectedWalletName: '',
      inputs: {
        password: '',
        newWalletName: '',
        derivationPath: '',
      },
      loading: {
        creatingWallet: false,
        decryptingWallet: false,
      },
      errors: {
        creatingWalletError: null,
        decryptingWalletError: null,
      },
      wallets: {
        software: {},
        hardware: {},
      },
    });
  });

  it('returns the initial state', () => {
    expect(walletManagerReducer(undefined, {})).toEqual(state);
  });

  it('should handle createNewWallet action correctly', () => {
    const expected = state
      .setIn(['loading', 'creatingWallet'], true)
      .set('progress', 0);
    expect(walletManagerReducer(state, createNewWallet())).toEqual(expected);
  });

  it('should handle createNewWalletSuccess action correctly', () => {
    const encryptedWallet = { id: 123 };
    const decryptedWallet = { key: 43 };
    const name = 'Henry';
    const expected = state
      .setIn(['loading', 'creatingWallet'], false)
      .setIn(['inputs', 'password'], '')
      .setIn(['errors', 'creatingWalletError'], null)
      .setIn(['wallets', 'software', name],
        fromJS({ encrypted: encryptedWallet, decrypted: decryptedWallet }));
    expect(walletManagerReducer(
      state,
      createNewWalletSuccess(
        name,
        encryptedWallet,
        decryptedWallet)))
      .toEqual(expected);
  });

  it('should handle createNewWalletFailed action correctly', () => {
    const error = 'error 1';
    const expected = state
      .setIn(['loading', 'creatingWallet'], false)
      .setIn(['errors', 'creatingWalletError'], error);
    expect(walletManagerReducer(state, createNewWalletFailed(error))).toEqual(expected);
  });

  it('should handle decryptWallet action correctly', () => {
    const expected = state
      .setIn(['loading', 'decryptingWallet'], true)
      .set('progress', 0);
    expect(walletManagerReducer(state, decryptWallet())).toEqual(expected);
  });

  it('should handle decryptWalletSuccess action correctly', () => {
    const decryptedWallet = { id: 1234 };
    const expected = state
      .setIn(['loading', 'decryptingWallet'], false)
      .setIn(['inputs', 'password'], '')
      .setIn(['errors', 'decryptingWalletError'], null)
      .setIn(['wallets', state.get('selectedWallet'), 'decrypted'], decryptedWallet);
    expect(walletManagerReducer(state, decryptWalletSuccess(decryptedWallet))).toEqual(expected);
  });

  it('should handle decryptWalletFailed action correctly', () => {
    const error = 'error 1';
    const expected = state
      .setIn(['loading', 'decryptingWallet'], false)
      .setIn(['errors', 'decryptingWalletError'], error);
    expect(walletManagerReducer(state, decryptWalletFailed(error))).toEqual(expected);
  });

  describe('load wallet stores', () => {
    it('load wallets', () => {
      const wallets = { software: { testWallet: { encrypted: '' } }, hardware: {} };
      const expected = state
        .set('wallets', fromJS(wallets));

      expect(walletManagerReducer(state, loadWalletsSuccess(wallets))).toEqual(expected);
    });

    describe('balances', () => {
      it('load wallet balances', () => {
        const wallets = { software: { testWallet: {} }, hardware: {} };
        const loading = true;
        const walletName = 'testWallet';
        const expected = state
          .set('wallets', fromJS(wallets))
          .setIn(['wallets', 'software', walletName, 'loadingBalances'], loading);

        expect(walletManagerReducer(state, loadWalletBalances(walletName, 'test'))).toEqual(expected);
      });
      it('load wallet balances', () => {
        const wallets = { software: { testWallet: {} }, hardware: {} };
        const balances = { tokenBalances: { tokens: [] } };
        const walletName = 'testWallet';
        const expected = state
          .set('wallets', fromJS(wallets))
          .setIn(['wallets', 'software', walletName, 'loadingBalances'], false)
          .setIn(['wallets', 'software', walletName, 'loadingBalancesError'], null)
          .setIn(['wallets', 'software', walletName, 'balances'], fromJS(balances.tokenBalances.tokens));

        expect(walletManagerReducer(state, loadWalletBalancesSuccess(walletName, balances.tokenBalances))).toEqual(expected);
      });
      it('should default to empty array if token property is null', () => {
        const wallets = { software: { testWallet: {} }, hardware: {} };
        const balances = { tokenBalances: {} };
        const walletName = 'testWallet';
        const expected = state
          .set('wallets', fromJS(wallets))
          .setIn(['wallets', 'software', walletName, 'loadingBalances'], false)
          .setIn(['wallets', 'software', walletName, 'loadingBalancesError'], null)
          .setIn(['wallets', 'software', walletName, 'balances'], fromJS([]));

        expect(walletManagerReducer(state, loadWalletBalancesSuccess(walletName, balances.tokenBalances))).toEqual(expected);
      });
      it('load wallet balances error', () => {
        const wallets = { software: { testWallet: {} }, hardware: {} };
        const error = new Error();
        const walletName = 'testWallet';
        const expected = state
          .set('wallets', fromJS(wallets))
          .setIn(['wallets', 'software', walletName, 'loadingBalances'], false)
          .setIn(['wallets', 'software', walletName, 'loadingBalancesError'], error);

        expect(walletManagerReducer(state, loadWalletBalancesError(walletName, error))).toEqual(expected);
      });
    });
  });
});