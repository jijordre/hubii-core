import React from 'react';
import { shallow } from 'enzyme';
import ImportWallet from '../index';

const walletData = [
  {
    src:
        'https://www.ledger.fr/wp-content/uploads/2017/09/Ledger_logo_footer@2x.png',
    name: 'ledger',
  },
  {
    name: 'Private Key',
  },
];

describe('<ImportWallet />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ImportWallet wallets={walletData} />);
    expect(wrapper).toMatchSnapshot();
  });
});
