import * as React from 'react';
import { Icon, Radio } from 'antd';
import Button from '../ui/Button';
import {
  Between,
  CreateButton,
  LeftArrow,
  Flex,
  Coins,
  CoinButton
} from './ImportWallet.style';
const onChange = e => {
  console.log(`radio checked:${e.target.value}`);
};
const RadioButton = Radio.Button;
const ImportWallet = () => (
  <div>
    <Between>
      <Flex>
        <LeftArrow type="arrow-left" />
        <span>Importing Ledger Wallet</span>
      </Flex>
      <div>
        <CreateButton>
          <Icon type="plus" />Create new wallet
        </CreateButton>
      </div>
    </Between>
    <Coins onChange={onChange}>
      <CoinButton value="a">
        <img
          src="https://www.ledger.fr/wp-content/uploads/2017/09/Ledger_logo_footer@2x.png"
          style={{ width: 110 }}
        />
      </CoinButton>
      <CoinButton value="b">
        <img
          src="https://www.ledger.fr/wp-content/uploads/2017/09/Ledger_logo_footer@2x.png"
          style={{ width: 110 }}
        />
      </CoinButton>
      <CoinButton value="c">
        <img
          src="https://www.ledger.fr/wp-content/uploads/2017/09/Ledger_logo_footer@2x.png"
          style={{ width: 110 }}
        />
      </CoinButton>
      <CoinButton value="d">
        <img
          src="https://www.ledger.fr/wp-content/uploads/2017/09/Ledger_logo_footer@2x.png"
          style={{ width: 110 }}
        />
      </CoinButton>
      <CoinButton value="e">
        <img
          src="https://www.ledger.fr/wp-content/uploads/2017/09/Ledger_logo_footer@2x.png"
          style={{ width: 110 }}
        />
      </CoinButton>
      <CoinButton value="f">
        <img
          src="https://www.ledger.fr/wp-content/uploads/2017/09/Ledger_logo_footer@2x.png"
          style={{ width: 110 }}
        />
      </CoinButton>
    </Coins>
  </div>
);
export default ImportWallet;
