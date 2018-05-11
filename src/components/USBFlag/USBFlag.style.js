import { Icon } from 'antd';
import styled from 'styled-components';

export const Slanted = styled.div`
  position: relative;
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: -48px;
    width: 0;
    height: 0;
    border-top: 100px solid ${({ theme }) => theme.palette.info};
    border-right: 100px solid transparent;
  }
`;

export const USB = styled(Icon)`
  position: absolute;
  font-size: 16px;
  top: 10px;
  left: 7px;
  font-weight: bolder;
`;
