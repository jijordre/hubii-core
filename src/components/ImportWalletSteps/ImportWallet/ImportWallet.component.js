import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Coins,
  Image,
  Center,
  CoinButton,
  StyledSpan,
  StyledButton,
  OptionText,
  Header,
  Wrapper,
} from './ImportWallet.style';

class ImportWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walletType: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  onChange(e) {
    this.setState({ walletType: e.target.value });
  }

  handleNext(e) {
    const { handleNext } = this.props;
    const { walletType } = this.state;
    e.preventDefault();
    handleNext({ walletType });
  }

  render() {
    const { walletType } = this.state;
    return (
      <Wrapper>
        <Header>How is the wallet stored?</Header>
        <Coins onChange={this.onChange}>
          {this.props.wallets.map((wallet) => (
            <CoinButton value={wallet.name} key={wallet.name}>
              <Center>
                {
                  wallet.src
                  ?
                    <Image src={wallet.src} />
                  :
                    <OptionText>{wallet.name}</OptionText>
                }
              </Center>
            </CoinButton>
          ))}
        </Coins>
        <StyledButton type={'primary'} disabled={walletType === ''} onClick={this.handleNext}>
          <StyledSpan>Next</StyledSpan>
        </StyledButton>
      </Wrapper>
    );
  }
}

ImportWallet.propTypes = {
  /**
   * Array of contacts whose list is to be shown.
   */
  wallets: PropTypes.array.isRequired,
    /**
   * Function to be executed when next button is pressed
   */
  handleNext: PropTypes.func,

};

export default ImportWallet;
