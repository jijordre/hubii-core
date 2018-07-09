import styled from 'styled-components';
import Button from '../../ui/Button';
import { ModalFormLabel, ModalFormInput, ModalFormItem } from '../../ui/Modal';

export const FormInput = styled(ModalFormInput)`
  height: 46px;
  width: 410px;
  border: 1px solid #43616F;
  border-radius: 4px;
`;

export const FormItem = styled(ModalFormItem)`
  display: flex;
  flex-direction: column;
  align-items: center;
  .ant-form-item-label{
    display: flex;
    align-self: start;
    margin-left: 3.6rem;}
`;

export const Image = styled.img`
  width: 150px;
  height: 44px;
  margin-top: 53px;
  margin-bottom: 53px;
`;

export const WidthEighty = styled.div`
  width: 70%;
`;

export const Flex = styled.div`
  display: flex;
  color: ${({ theme }) => theme.palette.light};
`;
export const IconDiv = styled.div`
  display: flex;
  justify-content: center;
`;
export const StyledModalFormLabel = styled(ModalFormLabel)`
  height: 14px;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
`;
export const StyledTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 207px;
  margin-bottom: 26px;
`;
export const StyledButton = styled(Button)`
  background-color: ${({ disabled: white }) =>
    white && 'transparent !important'};
  font-size: 12px;
  font-weight: 500;
  border-width: 2px;
  height: 40px;
  width: 162px;
  border: ${({ disabled: white, theme }) =>
    white && `2px solid ${theme.palette.secondary4} !important`};
  min-width: ${({ current: width }) => (width === 0 ? '260px' : '190px')};
  color: ${({ disabled: white, theme }) =>
    white
      ? `${theme.palette.secondary4} !important`
      : `${theme.palette.light} !important`};
  &:hover {
    background-color: ${({ disabled: white }) =>
      white && 'transparent !important'};
    border: ${({ disabled: white, theme }) =>
      white && `2px solid ${theme.palette.secondary4} !important`};
  }
`;

export const StyledBackButton = styled(Button)`
  height: 40px;
  width: 70px;
  margin-right: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.palette.light};
`;

export const StyledSpan = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  text-align: center;
`;