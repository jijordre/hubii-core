import { fromJS } from 'immutable';
import {
  selectWalletManagerDomain,
  makeSelectNewWalletNameInput,
  makeSelectPasswordInput,
  makeSelectSelectedWalletName,
  makeSelectWallets,
  makeSelectDerivationPathInput,
  makeSelectLoading,
  makeSelectErrors,
  makeSelectCurrentWalletDetails,
} from '../selectors';

describe('selectWalletManagerDomain', () => {
  it('should select the walletManagerDomain state', () => {
    const walletManagerState = fromJS({
      test: 1223,
    });
    const mockedState = fromJS({
      walletManager: walletManagerState,
    });
    expect(selectWalletManagerDomain(mockedState)).toEqual(walletManagerState);
  });
});

describe('makeSelectNewWalletNameInput', () => {
  const newWalletNameInputSelector = makeSelectNewWalletNameInput();
  it('should correctly select newWalletName', () => {
    const newWalletName = 'burgers';
    const mockedState = fromJS({
      walletManager: {
        inputs: {
          newWalletName,
        },
      },
    });
    expect(newWalletNameInputSelector(mockedState)).toEqual(newWalletName);
  });
});

describe('makeSelectPasswordInput', () => {
  const passwordInputSelector = makeSelectPasswordInput();
  it('should correctly select password', () => {
    const password = 'roast_beef';
    const mockedState = fromJS({
      walletManager: {
        inputs: {
          password,
        },
      },
    });
    expect(passwordInputSelector(mockedState)).toEqual(password);
  });
});

describe('makeSelectDerivationPathInput', () => {
  const derivationPathInputSelector = makeSelectDerivationPathInput();
  it('should correctly select derivationPath', () => {
    const derivationPath = 'm/0/0/11';
    const mockedState = fromJS({
      walletManager: {
        inputs: {
          derivationPath,
        },
      },
    });
    expect(derivationPathInputSelector(mockedState)).toEqual(derivationPath);
  });
});

describe('makeSelectSelectedWalletName', () => {
  const selectedWalletNameSelector = makeSelectSelectedWalletName();
  it('should correctly select selectedWalletName', () => {
    const selectedWalletName = 'cheese_toasty';
    const mockedState = fromJS({
      walletManager: {
        selectedWalletName,
      },
    });
    expect(selectedWalletNameSelector(mockedState)).toEqual(selectedWalletName);
  });
});

describe('makeSelectWallets', () => {
  const walletsSelector = makeSelectWallets();
  it('should correctly select wallets', () => {
    const wallets = fromJS({ software: { pineapple: { key: '123' } } });
    const mockedState = fromJS({
      walletManager: {
        wallets,
      },
    });
    expect(walletsSelector(mockedState)).toEqual(wallets);
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should correctly select loading state', () => {
    const loading = fromJS({ creatingWallet: true });
    const mockedState = fromJS({
      walletManager: {
        loading,
      },
    });
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectErrors', () => {
  const errorsSelector = makeSelectErrors();
  it('should correctly select errors state', () => {
    const errors = fromJS({ creatingWalletError: true });
    const mockedState = fromJS({
      walletManager: {
        errors,
      },
    });
    expect(errorsSelector(mockedState)).toEqual(errors);
  });
});

describe('makeSelectCurrentWalletDetails', () => {
  const walletSelector = makeSelectCurrentWalletDetails();
  it('should convert select current wallet details from the wallet list', () => {
    const expected = {
      address: '2',
      encrypted: { address: '2' },
      name: 't2',
      type: 'software',
    };
    const mockedState = fromJS({
      walletManager: {
        wallets: {
          software: {
            t1: { encrypted: '{"address": "1"}' },
            t2: { encrypted: '{"address": "2"}' },
          },
        },
        currentWallet: {
          address: '0x2',
        },
      },
    });
    expect(walletSelector(mockedState)).toEqual(expected);
  });
});