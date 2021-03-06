import React from 'react';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';

import Notification from 'components/Notification';
import Text from 'components/ui/Text';

import {
  TopHeading,
  TextPrimary,
  Wrapper,
  ParentDiv,
  SecondaryHeader,
  StyledButton,
  StyledIcon,
} from './style';

/**
 * ExportPrivateInfo
 */
export default class ExportPrivateInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.showNotification = this.showNotification.bind(this);
  }

  showNotification(type) {
    const success = true;
    const message = `${type} copied to clipboard`;
    Notification(success, message);
  }

  render() {
    const { mnemonic, privateKey, onExit } = this.props;
    return (
      <Wrapper>
        <TopHeading>Never share this information with anyone</TopHeading>
        <TopHeading>Always keep a physical backup in a safe location</TopHeading>
        <TextPrimary>
          {
              mnemonic ?
                <div style={{ marginBottom: '0.5rem' }}>
                  <SecondaryHeader large>
                    Mnemonic
                    <CopyToClipboard text={mnemonic} >
                      <StyledIcon
                        type="icon"
                        icon="copy"
                        size={'small'}
                        onClick={() => this.showNotification('Mnemonic')}
                        id="mnemonic"
                      />
                    </CopyToClipboard>
                  </SecondaryHeader>
                  <br />
                  <Text>{mnemonic}</Text>
                </div> :
                <div style={{ marginBottom: '0.5rem' }}>
                  <SecondaryHeader large>
                    Mnemonic
                  </SecondaryHeader>
                  <br />
                  <Text>This wallet was imported using a private key therefore does not have a mnemonic to export</Text>
                </div>
            }
          <div>
            <SecondaryHeader large>
              Private key
            <CopyToClipboard text={privateKey} >
              <StyledIcon
                type="icon"
                icon="copy"
                size={'small'}
                onClick={() => this.showNotification('Private key')}
                id="privateKey"
              />
            </CopyToClipboard>
            </SecondaryHeader>
            <br />
            <Text>{privateKey}</Text>
          </div>
        </TextPrimary>
        <ParentDiv>
          <StyledButton type="primary" onClick={onExit} id="exit">
            Close
          </StyledButton>
        </ParentDiv>
      </Wrapper>
    );
  }
}

ExportPrivateInfo.propTypes = {
  /**
   * Function to perform action when exit button is clicked
   */
  onExit: PropTypes.func.isRequired,
  /**
   * Wallet mnemonic
   */
  mnemonic: PropTypes.string,
  /**
   * Wallet private key
   */
  privateKey: PropTypes.string,
};
