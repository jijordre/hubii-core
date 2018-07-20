/* eslint-disable */
import * as React from 'react';
import { Form, Icon } from 'antd';
import PropTypes from 'prop-types';
import {
  WidthEighty,
  StyledModalFormLabel,
  ButtonDiv,
  StyledBackButton,
  StyledButton,
  StyledSpan,
  StyledSpin,
} from '../ImportWalletForm.style';
import { ModalFormInput, ModalFormItem } from 'components/ui/Modal';
import { handleFinish, compareToFirstPassword} from 'utils/forms';

class ImportWalletPrivateKeyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
    };
    this.handleFinish = this.handleFinish.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
  }

  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({
      confirmDirty: this.state.confirmPasswordsMatch || !!value,
    });
  }
  compareToFirstPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Entered passwords do not match');
    } else {
      callback();
    }
  }
  validateToNextPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleFinish(e) {
    const { form, handleNext } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err && handleNext) {
        handleNext(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { form, handleNext, loading } = this.props;
    return (
      <div>
        <Form
          onSubmit={(e) => handleFinish(e, form, handleNext)}
          layout="vertical"
          style={{
            marginTop: '5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <WidthEighty>
            <ModalFormItem
              label={
                <StyledModalFormLabel>
                  Wallet Name
                </StyledModalFormLabel>
              }
            >
              {getFieldDecorator('name', {
                rules: [
                  {
                    message: 'Required field',
                    required: true,
                    whitespace: true,
                  },
                ],
              })(<ModalFormInput disabled={loading}/>)}
            </ModalFormItem>
            <ModalFormItem
              label={
                <StyledModalFormLabel>
                  Private Key
                </StyledModalFormLabel>
              }
            >
              {getFieldDecorator('privateKey', {
                rules: [
                  {
                    message: 'Required field',
                    required: true,
                    whitespace: true,
                  },
                ],
              })(<ModalFormInput disabled={loading}/>)}
            </ModalFormItem>
            <ModalFormItem
              label={
                <StyledModalFormLabel>Password</StyledModalFormLabel>
              }
            >
              {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter a password',
                    },
                    {
                      min: 6,
                      message: 'Password must be at least 6 characters',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(<ModalFormInput type="password" />)}
            </ModalFormItem>
            <ModalFormItem
              label={
                <StyledModalFormLabel>Repeat password</StyledModalFormLabel>
              }
            >
            {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<ModalFormInput type="password" onBlur={this.handleConfirmBlur}/>)}
            </ModalFormItem>
            {loading ?
              (
                <ButtonDiv loading={loading}>
                  <StyledSpin
                  delay={0}
                  tip="Importing Wallet..."
                  size="large"
                  />
                </ButtonDiv>
              ) 
              :
              (
                <ButtonDiv>
                  <StyledBackButton type={"primary"} onClick={this.props.handleBack}>
                    <StyledSpan>Back</StyledSpan>
                  </StyledBackButton>
                  <StyledButton type={"primary"} htmlType="submit">
                    <StyledSpan>Finish</StyledSpan>
                  </StyledButton>
                </ButtonDiv>
              )
            }
          </WidthEighty>
        </Form>
      </div>
    );
  }
}

ImportWalletPrivateKeyForm.propTypes = {
  /**
   * Function to be executed when back button is pressed
   */
  handleBack: PropTypes.func.isRequired,
  /**
   * Function to be executed when next is clicked.
   */
  handleNext: PropTypes.func.isRequired,
    /**
   * ant design form
   */
  form: PropTypes.object,
  /**
   * loading
   */
  loading: PropTypes.bool.isRequired,
};

export default Form.create()(ImportWalletPrivateKeyForm);
