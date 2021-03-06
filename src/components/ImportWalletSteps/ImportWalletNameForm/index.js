/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { handleFinish } from 'utils/forms';
import Text from 'components/ui/Text';
import { ModalFormLabel } from 'components/ui/Modal';
import {
  Image,
  IconDiv,
  WidthEighty,
  ButtonDiv,
  StyledButton,
  StyledBackButton,
  FormInput,
  FormItem,
  StyledSpin,
} from '../style';
class ImportWalletNameForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { form, handleNext, handleBack, loading } = this.props;
    return (
      <div>
        <IconDiv>
          {this.props.wallet.src && <Image src={this.props.wallet.src} />}
        </IconDiv>
        <Form
          onSubmit={(e) => handleFinish(e, form, handleNext)}
          layout="vertical"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <WidthEighty>
            <FormItem
              label={
                <ModalFormLabel>
                  Enter a name for your wallet 
                </ModalFormLabel>
              }
            >
              {getFieldDecorator('name', {
                rules: [
                  {
                    message: 'Name is required.',
                    required: true,
                  },
                ],
              })(<FormInput />)}
            </FormItem>
            {loading ?
              (
                <ButtonDiv loading={loading}>
                  <StyledSpin
                  delay={0}
                  size="large"
                  />
                </ButtonDiv>
              ) 
              :
              (
                <ButtonDiv>
                  <StyledBackButton type="default" onClick={this.props.handleBack}>
                    <Text>Back</Text>
                  </StyledBackButton>
                  <StyledButton type="primary" htmlType="submit">
                    <Text>Finish</Text>
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

ImportWalletNameForm.propTypes = {
  /**
   * Wallet object to be shown.
   */
  wallet: PropTypes.object.isRequired,
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

export default Form.create()(ImportWalletNameForm);
