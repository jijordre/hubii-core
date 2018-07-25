/*
 *
 * WalletHoc actions
 *
 */
import { utils } from 'ethers';
import abiDecoder from 'abi-decoder';

import {
  CREATE_WALLET_FROM_MNEMONIC,
  CREATE_WALLET_FROM_PRIVATE_KEY,
  CREATE_WALLET_FAILURE,
  CREATE_WALLET_SUCCESS,
  ADD_NEW_WALLET,
  DECRYPT_WALLET,
  DECRYPT_WALLET_FAILURE,
  DECRYPT_WALLET_SUCCESS,
  SHOW_DECRYPT_WALLET_MODAL,
  HIDE_DECRYPT_WALLET_MODAL,
  SET_CURRENT_WALLET,
  LOAD_WALLETS,
  LOAD_WALLETS_SUCCESS,
  LOAD_WALLET_BALANCES,
  LOAD_WALLET_BALANCES_SUCCESS,
  LOAD_WALLET_BALANCES_ERROR,
  LOAD_SUPPORTED_TOKENS,
  LOAD_SUPPORTED_TOKENS_SUCCESS,
  LOAD_SUPPORTED_TOKENS_ERROR,
  LOAD_PRICES,
  LOAD_PRICES_SUCCESS,
  LOAD_PRICES_ERROR,
  TRANSFER,
  TRANSFER_ETHER,
  TRANSFER_ERC20,
  TRANSFER_SUCCESS,
  TRANSFER_ERROR,
  POLL_LEDGER,
  LEDGER_DETECTED,
  LEDGER_ERROR,
  START_LEDGER_SYNC,
  STOP_LEDGER_SYNC,
  FETCH_LEDGER_ADDRESSES,
  FETCHED_LEDGER_ADDRESS,
  DELETE_WALLET,
} from './constants';

import getFriendlyError from '../../utils/ledger/friendlyErrors';

export function deleteWallet(address) {
  return {
    type: DELETE_WALLET,
    address,
  };
}

export function addNewWallet(newWallet) {
  return {
    type: ADD_NEW_WALLET,
    newWallet,
  };
}

export function createWalletFromMnemonic(name, mnemonic, derivationPath, password) {
  return {
    type: CREATE_WALLET_FROM_MNEMONIC,
    name,
    mnemonic,
    derivationPath,
    password,
  };
}

export function createWalletFromPrivateKey(privateKey, name, password) {
  return {
    type: CREATE_WALLET_FROM_PRIVATE_KEY,
    privateKey,
    name,
    password,
  };
}

export function createWalletSuccess(name, encryptedWallet, decryptedWallet) {
  return {
    type: CREATE_WALLET_SUCCESS,
    newWallet: {
      name,
      address: decryptedWallet.address,
      type: 'software',
      encrypted: encryptedWallet,
      decrypted: decryptedWallet,
    },
  };
}

export function createWalletFailed(error) {
  return {
    type: CREATE_WALLET_FAILURE,
    error,
  };
}

export function decryptWallet(address, encryptedWallet, password) {
  return {
    type: DECRYPT_WALLET,
    encryptedWallet,
    address,
    password,
  };
}

export function decryptWalletSuccess(address, decryptedWallet) {
  return {
    type: DECRYPT_WALLET_SUCCESS,
    address,
    decryptedWallet,
  };
}

export function decryptWalletFailed(error) {
  return {
    type: DECRYPT_WALLET_FAILURE,
    error,
  };
}

export function showDecryptWalletModal(walletName) {
  return {
    type: SHOW_DECRYPT_WALLET_MODAL,
    walletName,
  };
}

export function hideDecryptWalletModal(walletName) {
  return {
    type: HIDE_DECRYPT_WALLET_MODAL,
    walletName,
  };
}

export function setCurrentWallet(address) {
  return {
    type: SET_CURRENT_WALLET,
    address,
  };
}

export function loadWallets() {
  return {
    type: LOAD_WALLETS,
  };
}

export function loadWalletsSuccess(wallets) {
  return {
    type: LOAD_WALLETS_SUCCESS,
    wallets,
  };
}

export function loadWalletsBalances() {
  return {
    type: LOAD_WALLETS_SUCCESS,
  };
}

export function loadWalletBalances(address) {
  return {
    type: LOAD_WALLET_BALANCES,
    address,
  };
}

export function loadWalletBalancesSuccess(address, assets) {
  return {
    type: LOAD_WALLET_BALANCES_SUCCESS,
    address,
    assets,
  };
}

export function loadWalletBalancesError(address, error) {
  return {
    type: LOAD_WALLET_BALANCES_ERROR,
    address,
    error,
  };
}

export function loadSupportedTokens() {
  return {
    type: LOAD_SUPPORTED_TOKENS,
  };
}

export function loadSupportedTokensSuccess(tokens) {
  tokens.push({ currency: 'ETH', symbol: 'ETH', decimals: 18, color: 'grey' });
  return {
    type: LOAD_SUPPORTED_TOKENS_SUCCESS,
    assets: tokens,
  };
}

export function loadSupportedTokensError(error) {
  return {
    type: LOAD_SUPPORTED_TOKENS_ERROR,
    error,
  };
}

export function loadPrices() {
  return {
    type: LOAD_PRICES,
  };
}

export function loadPricesSuccess(prices) {
  prices.push({ currency: 'ETH', eth: 1, btc: 0.01, usd: 412 });
  return {
    type: LOAD_PRICES_SUCCESS,
    prices,
  };
}

export function loadPricesError(error) {
  return {
    type: LOAD_PRICES_ERROR,
    error,
  };
}

export function transfer(payload) {
  return {
    type: TRANSFER,
    wallet: payload.wallet,
    token: payload.token,
    toAddress: payload.toAddress,
    amount: payload.amount,
    gasPrice: payload.gasPrice,
    gasLimit: payload.gasLimit,
    contractAddress: payload.contractAddress,
  };
}

export function transferEther(payload) {
  return {
    type: TRANSFER_ETHER,
    toAddress: payload.toAddress,
    amount: payload.amount,
    gasPrice: payload.gasPrice,
    gasLimit: payload.gasLimit,
  };
}

export function transferERC20(payload) {
  return {
    type: TRANSFER_ERC20,
    token: payload.token,
    contractAddress: payload.contractAddress,
    toAddress: payload.toAddress,
    amount: payload.amount,
    gasPrice: payload.gasPrice,
    gasLimit: payload.gasLimit,
  };
}

export function transferSuccess(transaction, token) {
  const formatedTransaction = {
    timestamp: new Date().getTime(),
    token,
    from: transaction.from,
    to: transaction.to,
    hash: transaction.hash,
    value: parseFloat(utils.formatEther(transaction.value)),
    input: transaction.data,
    original: transaction,
  };
  if (token !== 'ETH') {
    const inputData = abiDecoder.decodeMethod(transaction.data);
    const toAddress = inputData.params.find((param) => param.name === '_to');
    const tokens = inputData.params.find((param) => param.name === '_tokens');
    const wei = utils.bigNumberify(tokens.value);
    formatedTransaction.to = toAddress.value;
    formatedTransaction.value = parseFloat(utils.formatEther(wei));
  }
  return {
    type: TRANSFER_SUCCESS,
    transaction: formatedTransaction,
  };
}

export function pollLedger() {
  return {
    type: POLL_LEDGER,
  };
}

export function startLedgerSync() {
  return {
    type: START_LEDGER_SYNC,
  };
}

export function stopLedgerSync() {
  return {
    type: STOP_LEDGER_SYNC,
  };
}

export function fetchLedgerAddresses(derivationPaths) {
  return {
    type: FETCH_LEDGER_ADDRESSES,
    derivationPaths,
  };
}

export function fetchedLedgerAddress(derivationPath, address) {
  return {
    type: FETCHED_LEDGER_ADDRESS,
    derivationPath,
    address,
  };
}

export function saveLedgerAddress(name, derivationPath, deviceId, address) {
  const newWallet = {
    deviceId,
    address,
    type: 'lns',
    name,
    derivationPath,
  };
  return {
    type: CREATE_WALLET_SUCCESS,
    newWallet,
  };
}

export function ledgerDetected(id) {
  return {
    type: LEDGER_DETECTED,
    id,
  };
}

export function ledgerError(rawError) {
  const friendlyError = getFriendlyError(rawError);
  return {
    type: LEDGER_ERROR,
    error: friendlyError,
  };
}

export function transferError(error) {
  return {
    type: TRANSFER_ERROR,
    error,
  };
}
