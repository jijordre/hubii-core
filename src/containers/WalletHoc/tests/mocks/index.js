import { fromJS } from 'immutable';
import BigNumber from 'bignumber.js';

export const encryptedSoftwareWallet1Mock = fromJS({
  name: 'software-wallet-mock1',
  address: '0x82191e2863E0b6AFC0A7D538cdabfd509aA648b5',
  type: 'software',
  encrypted: '{"address":"82191e2863e0b6afc0a7d538cdabfd509aa648b5","id":"2c8ffa0a-5624-4191-94a3-3869ae170702","version":3,"Crypto":{"cipher":"aes-128-ctr","cipherparams":{"iv":"30d2c35f4ebb46423e782814c735ff94"},"ciphertext":"d2e98cdb8c6d7ddb9192d5f1a633df3e37f02ec3a950c8673f98d03dc011e477","kdf":"scrypt","kdfparams":{"salt":"14c5ee2eb9dfe1f10bfd3fc7dde4de93197883477e74e5eb51bef5786865b401","n":131072,"dklen":32,"p":1,"r":8},"mac":"9f2740c399e9a2f141fefb816ed2fe2aeee8de2ebc8c73f7c87890b4ae928501"},"x-ethers":{"client":"ethers.js","gethFilename":"UTC--2018-08-13T05-04-04.0Z--82191e2863e0b6afc0a7d538cdabfd509aa648b5","mnemonicCounter":"631a83199112cb4398ee94dd2e9d105c","mnemonicCiphertext":"a92457ab3b87724a76536873f8eb5e28","version":"0.1"}}',
});

export const decryptedSoftwareWallet1Mock = encryptedSoftwareWallet1Mock
  .set('decrypted', fromJS({
    privateKey: '0x566157c389ca0afe0237387cc352b6910594548bd77631a19e9ccc588c969a2a',
    defaultGasLimit: 1500000,
    address: '0x82191e2863E0b6AFC0A7D538cdabfd509aA648b5',
    mnemonic: 'over sentence spend best business museum ripple shop vault present travel fire',
    path: "m/44'/60'/0'/0/0",
  }));

export const encryptedSoftwareWallet2Mock = fromJS({
  name: 'software-wallet-mock2',
  address: '0xF4db7c6030c9c5754A6A712212d6342DCA52e25d',
  type: 'software',
  encrypted: '"{"address":"f4db7c6030c9c5754a6a712212d6342dca52e25d","id":"b3f33163-7085-4926-931b-76c1518912b5","version":3,"Crypto":{"cipher":"aes-128-ctr","cipherparams":{"iv":"f1f74d7e443eb7ce7ecdb7d12d860532"},"ciphertext":"ef22c4c440c385e7d2635b7ead479472dab4e8d00e5ba82513344a8fa057151b","kdf":"scrypt","kdfparams":{"salt":"c55a2e1a1ed54cff2dafeb53d825f5e67ce546d0c930e198b07c65ff4538bafa","n":131072,"dklen":32,"p":1,"r":8},"mac":"a359b225c6dd9caedf2a7a624ec426b68b7f1d7eb5378ffe33d1b7219cddb0ff"},"x-ethers":{"client":"ethers.js","gethFilename":"UTC--2018-08-13T05-24-22.0Z--f4db7c6030c9c5754a6a712212d6342dca52e25d","mnemonicCounter":"c6bc00f4277c72aae56538fd6f92c7db","mnemonicCiphertext":"aba771a74a5c8a16edbca85828d8c087","version":"0.1"}}"',
});

export const decryptedSoftwareWallet2Mock = encryptedSoftwareWallet2Mock
  .set('decrypted', fromJS({
    privateKey: '0xc6ea866d2f5468e0caf0e96e1491c257f501a30ce695e2d8b876946995699828',
    defaultGasLimit: 1500000,
    address: '0xF4db7c6030c9c5754A6A712212d6342DCA52e25d',
    path: "m/44'/60'/0'/0/0",
  }));

export const lnsWalletMock = fromJS({
  deviceId: '041ca8e96420e95a106e8c9bb3c9fb9e8c00d4b11cac562888c898000b5cec366c03a0f84574716fac6c7a7df47a925f0e30f5286546adf3179b5a08dc9d8e09da',
  address: '0x1c7429f62595097315289ceBaC1fDbdA587Ad512',
  type: 'lns',
  name: 'lns',
  derivationPath: "m/44'/60'/0'/0",
});

export const trezorWalletMock = fromJS({
  deviceId: '7BB16BDA1AFB971DF5D954EF',
  address: '0x2ba8dc656a85d6d36f93c5e2e17ca910efa5faeb',
  type: 'trezor',
  name: 'trezor',
  derivationPath: "m/44'/60'/0'/0/1",
});

export const contactsMock = fromJS([
  {
    name: 'mike',
    address: '0x123123',
  },
  {
    name: 'john',
    address: '0x1231323',
  },
]);

export const contactsEmptyMock = fromJS([]);

export const totalBalAllEmpty = fromJS({
  baseLayer: { assets: {}, loading: false, error: null, total: { usd: new BigNumber('0') } },
  nahmiiAvailable: { assets: {}, loading: false, error: null, total: { usd: new BigNumber('0') } },
  nahmiiStaging: { assets: {}, loading: false, error: null, total: { usd: new BigNumber('0') } },
  nahmiiStaged: { assets: {}, loading: false, error: null, total: { usd: new BigNumber('0') } },
  nahmiiCombined: { assets: {}, loading: false, error: null, total: { usd: new BigNumber('0') } },
  combined: { assets: {}, loading: false, error: null, total: { usd: new BigNumber('0') } },
});

export const totalBalAllError = fromJS({
  baseLayer: { assets: {}, loading: false, error: true, total: { usd: new BigNumber('0') } },
  nahmiiAvailable: { assets: {}, loading: false, error: true, total: { usd: new BigNumber('0') } },
  nahmiiStaging: { assets: {}, loading: false, error: true, total: { usd: new BigNumber('0') } },
  nahmiiStaged: { assets: {}, loading: false, error: true, total: { usd: new BigNumber('0') } },
  nahmiiCombined: { assets: {}, loading: false, error: null, total: { usd: new BigNumber('0') } },
  combined: { assets: {}, loading: false, error: true, total: { usd: new BigNumber('0') } },
});

export const totalBallAllLoading = fromJS({
  baseLayer: { assets: {}, loading: true, error: null, total: { usd: new BigNumber('0') } },
  nahmiiAvailable: { assets: {}, loading: true, error: null, total: { usd: new BigNumber('0') } },
  nahmiiStaging: { assets: {}, loading: true, error: null, total: { usd: new BigNumber('0') } },
  nahmiiStaged: { assets: {}, loading: true, error: null, total: { usd: new BigNumber('0') } },
  nahmiiCombined: { assets: {}, loading: false, error: null, total: { usd: new BigNumber('0') } },
  combined: { assets: {}, loading: true, error: null, total: { usd: new BigNumber('0') } },
});
