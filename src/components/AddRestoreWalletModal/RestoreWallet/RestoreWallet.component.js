import * as React from 'react';
import { Row, Col, Form, Spin } from 'antd';
import ethers from 'ethers';
import PropTypes from 'prop-types';
import { CenterWrapper, RestoreButton, Loading } from './RestoreWallet.style';
import {
  ModalFormLabel,
  ModalFormInput,
  ModalFormItem,
  ModalFormTextArea,
} from '../../ui/Modal';
/**
 * This component shows form to  restorewallet.
 */
class RestoreWallet extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      confirmPasswordsMatch: false,
    };
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.validateSeedWords = this.validateSeedWords.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({
      confirmPasswordsMatch: this.state.confirmPasswordsMatch || !!value,
    });
  }

  validateSeedWords(rule, value, callback) {
    if (value && !ethers.HDNode.isValidMnemonic(value)) {
      callback('The seed words are invalid!!');
    } else {
      callback();
    }
  }

  compareToFirstPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('The passwords do not match!');
    } else {
      callback();
    }
  }
  validateToNextPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmPasswordsMatch) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ marginTop: 67 }}>
        <Row justify="center" type="flex">
          <Col span={18}>
            <Form onSubmit={this.handleSubmit}>
              <ModalFormItem
                colon={false}
                label={<ModalFormLabel>Give your wallet a Name</ModalFormLabel>}
              >
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: 'Wallet name is required.',
                    },
                  ],
                })(<ModalFormInput />)}
              </ModalFormItem>
              <ModalFormItem
                colon={false}
                label={<ModalFormLabel>Enter the seed words</ModalFormLabel>}
              >
                {getFieldDecorator('mnemonic', {
                  rules: [
                    {
                      required: true,
                      message: 'Seed words are required.',
                    },
                    {
                      validator: this.validateSeedWords,
                    },
                  ],
                })(<ModalFormTextArea rows={4} />)}
              </ModalFormItem>
              <CenterWrapper>
                {this.props.loading ? (
                  <Spin indicator={<Loading type="loading" />} />
                ) : (
                  <RestoreButton type="primary" htmlType="submit">
                    Restore
                  </RestoreButton>
                )}
              </CenterWrapper>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
RestoreWallet.propTypes = {
  /**
   * loading state of the component.
   */
  loading: PropTypes.bool,
  /**
   *  callback  function,  triggered when formis  successfully submitted.
   */
  handleSubmit: PropTypes.func,

  /**
   * This prop is passed by  Form component to  use  validation.
   */
  form: PropTypes.object,
};

export default Form.create()(RestoreWallet);