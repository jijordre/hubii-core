import styled from 'styled-components';
import { Icon } from 'antd';

import Text from 'components/ui/Text';

export const Logo = styled.img`
  border-radius: 50%;
  height: 1.14rem;
  width: 1.14rem;
  margin-right: 0.5rem;
`;

export const Label = styled(Text)`
  color: ${({ theme }) => theme.palette.light};
`;

export const Percentage = styled.div`
  color: ${({ theme, unknownPrice }) => unknownPrice
    ? theme.palette.secondary
    : theme.palette.info
  };
  white-space: nowrap;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const FlexItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 1rem 0 0;
  flex-wrap: wrap;
`;

export const ToggleExpandedArrow = styled(Icon).attrs({
  type: 'down',
  style: ({ expanded }) => ({
    transform: `rotate(${expanded * 180}deg)`,
  }),
})`
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.palette.info};
`;

export const NahmiiBalancesWrapper = styled.div.attrs({
  style: ({ expanded }) => ({
    transform: `translate3d(0,${20 - (expanded * 20)}px,0)`,
    opacity: expanded,
  }),
})`
  margin-top: 1rem;
  flex-direction: column;
  margin-left: 0.5rem;
  padding-left: 1rem;
  border-left: 1px solid ${({ theme }) => theme.palette.info2};
`;
