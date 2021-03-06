import EthereumTx from 'ethereumjs-tx';

export default (payload) => {
  const txParams = {
    to: payload.toAddress,
    value: payload.amount,
    gasPrice: payload.gasPrice,
    gasLimit: payload.gasLimit,
    nonce: payload.nonce,
    data: payload.data,
    chainId: payload.chainId,
  };
  return new EthereumTx(txParams);
};
