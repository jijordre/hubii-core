import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import DerivationPathContainer from 'containers/DerivationPathContainer';
import Text from 'components/ui/Text';

import {
  NavigationWrapper,
  Wrapper,
  LeftArrow,
} from './style';

import ImportWallet from './ImportWallet';
import ImportWalletNameForm from './ImportWalletNameForm';
import ImportWalletPrivateKeyForm from './ImportWalletPrivateKeyForm';
import ImportWalletMnemonicForm from './ImportWalletMnemonicForm';
import ImportWalletKeystoreForm from './ImportWalletKeystoreForm';
import FormSteps from '../FormSteps';

class ImportWalletSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      selectedWallet: { src: '', name: '' },
      data: [],
    };
    this.searchSRC = this.searchSRC.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  getSteps() {
    const { selectedWallet } = this.state;
    const { wallets, loading } = this.props;
    const steps = [
      {
        title: 'First',
        content: (
          <ImportWallet
            handleNext={this.handleNext}
            wallets={wallets}
          />
        ),
      },
    ];
    const stepTypes = {
      ledger: [
        {
          title: 'Second',
          content: (
            <DerivationPathContainer
              handleBack={this.handleBack}
              handleNext={this.handleNext}
              deviceType="lns"
              pathTemplate={'m/44\'/60\'/0\'/{index}'}
            />
            ),
        },
        {
          title: 'Last',
          content: (
            <ImportWalletNameForm
              wallet={selectedWallet}
              handleBack={this.handleBack}
              handleNext={this.handleNext}
              loading={loading}
            />
          ),
        },

      ],
      Trezor: [
        {
          title: 'Second',
          content: (
            <DerivationPathContainer
              handleBack={this.handleBack}
              handleNext={this.handleNext}
              deviceType="trezor"
              pathTemplate={'m/44\'/60\'/0\'/0/{index}'}
            />
            ),
        },
        {
          title: 'Last',
          content: (
            <ImportWalletNameForm
              wallet={selectedWallet}
              handleBack={this.handleBack}
              handleNext={this.handleNext}
              loading={loading}
            />
          ),
        },

      ],
      'Private key': [
        {
          title: 'Last',
          content: (
            <ImportWalletPrivateKeyForm
              wallet={selectedWallet}
              handleBack={this.handleBack}
              handleNext={this.handleNext}
              loading={loading}
            />
          ),
        },
      ],
      Mnemonic: [
        {
          title: 'Last',
          content: (
            <ImportWalletMnemonicForm
              handleBack={this.handleBack}
              handleNext={this.handleNext}
              loading={loading}
            />
          ),
        },
      ],
      Keystore: [
        {
          title: 'Last',
          content: (
            <ImportWalletKeystoreForm
              handleBack={this.handleBack}
              handleNext={this.handleNext}
              loading={loading}
            />
          ),
        },
      ],
    };
    return steps.concat(stepTypes[selectedWallet.name || 'Private key' || 'Mnemonic']);
  }

  searchSRC(logoName, wallets) {
    return wallets.find((wallet) => wallet.name === logoName);
  }

  handleBack() {
    this.setState(({ current }) => ({ current: current - 1 }));
  }

  handleNext(stepData) {
    const { wallets } = this.props;
    this.setState((prev) => {
      const { data, current } = prev;
      data[current] = stepData;
      const steps = this.getSteps();
      if (current === steps.length - 1) {
        return this.props.handleSubmit(data);
      }
      if (current === 0) {
        const selectedWallet = this.searchSRC(stepData.walletType, wallets);
        return { data, current: current + 1, selectedWallet };
      }
      return { data, current: current + 1 };
    });
  }

  render() {
    const { current } = this.state;
    const { onBackIcon } = this.props;
    const { formatMessage } = this.props.intl;

    const FormNavigation = (
      <Wrapper>
        <NavigationWrapper>
          <LeftArrow type="arrow-left" onClick={() => onBackIcon()} />
          <Text large>{formatMessage({ id: 'import_exist_wallet' })}</Text>
        </NavigationWrapper>
      </Wrapper>
    );
    const steps = this.getSteps();
    return (
      <FormSteps steps={steps} currentStep={current} beforeContent={FormNavigation} />
    );
  }
}

ImportWalletSteps.propTypes = {
  wallets: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  onBackIcon: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ImportWalletSteps);
