import { fromJS } from 'immutable';

import { storeMock } from 'mocks/store';

import {
  makeSelectNahmiiBalances,
  makeSelectDisclaimerModal,
} from '../selectors';

import {
  balances,
  balancesEmpty,
} from './mocks/selectors';

describe('makeSelectDisclaimerModal', () => {
  const disclaimerModalSelector = makeSelectDisclaimerModal();
  it('should select the correct state', () => {
    const expected = storeMock.getIn(['nahmiiHoc', 'disclaimerModal']);
    expect(disclaimerModalSelector(storeMock)).toEqual(expected);
  });
});

describe('makeSelectNahmiiBalances', () => {
  const nahmiiBalancesSelector = makeSelectNahmiiBalances();
  it('should combine different types of balances from the store into a total', () => {
    const expected = balances;
    expect(nahmiiBalancesSelector(storeMock)).toEqual(expected);
  });

  it('should return loading total if available assets are loading', () => {
    const mockedState = storeMock.setIn(['nahmiiHoc', 'balances', 0, 'available', 'loading'], true);
    expect(nahmiiBalancesSelector(mockedState).getIn([0, 'total', 'loading'])).toEqual(true);
  });

  it('should return loading total if staged assets are loading', () => {
    const mockedState = storeMock.setIn(['nahmiiHoc', 'balances', 0, 'staged', 'loading'], true);
    expect(nahmiiBalancesSelector(mockedState).getIn([0, 'total', 'loading'])).toEqual(true);
  });

  it('should return loading total if staging assets are loading', () => {
    const mockedState = storeMock.setIn(['nahmiiHoc', 'balances', 0, 'staging', 'loading'], true);
    expect(nahmiiBalancesSelector(mockedState).getIn([0, 'total', 'loading'])).toEqual(true);
  });

  it('should return errored total if available assets are errored', () => {
    const mockedState = storeMock.setIn(['nahmiiHoc', 'balances', 0, 'staging', 'error'], 'someerror');
    expect(nahmiiBalancesSelector(mockedState).getIn([0, 'total', 'error'])).toEqual('someerror');
  });

  it('should return errored total if staged assets are errored', () => {
    const mockedState = storeMock.setIn(['nahmiiHoc', 'balances', 0, 'staged', 'error'], 'someerror');
    expect(nahmiiBalancesSelector(mockedState).getIn([0, 'total', 'error'])).toEqual('someerror');
  });

  it('should return errored total if staging assets are errored', () => {
    const mockedState = storeMock.setIn(['nahmiiHoc', 'balances', 0, 'staging', 'error'], 'someerror');
    expect(nahmiiBalancesSelector(mockedState).getIn([0, 'total', 'error'])).toEqual('someerror');
  });

  it('should return an empty object if no balances', () => {
    const mockedState = storeMock.setIn(['nahmiiHoc', 'balances'], fromJS({}));
    expect(nahmiiBalancesSelector(mockedState)).toEqual(balancesEmpty);
  });

  it('should return an empty object if balances undefined', () => {
    const mockedState = storeMock.deleteIn(['nahmiiHoc', 'balances']);
    expect(nahmiiBalancesSelector(mockedState)).toEqual(balancesEmpty);
  });
});
