import styled from 'styled-components';
import Button from '../ui/Button';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Text = styled.div`
  color: ${({ theme }) => theme.palette.info};
  font-size: large;
  margin-bottom: 1.5rem;
`;

export const SecondaryHeader = styled.div`
  color: ${({ theme }) => theme.palette.info};
  font-size: large;
  margin: 0.5rem 0 0.5rem 2rem;
`;
export const TextPrimary = styled.div`
  color: ${({ theme }) => theme.palette.light};
  text-align: center;
`;
export const StyledIcon = styled(Button)`
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.palette.secondary1};
  background: ${({ theme }) => theme.palette.secondary8};
  border-color: ${({ theme }) => theme.palette.secondary8};
  &:hover {
      color: ${({ theme }) => theme.palette.info};
      background: ${({ theme }) => theme.palette.secondary8} !important;
      border-color: ${({ theme }) => theme.palette.secondary8} !important;
    }
`;

export const StyledButton = styled(Button)`
  min-width: 150px;
  border-width: 2px;
  padding: 0.5rem 1rem;
  margin: 1rem;
  color: ${({ theme }) => theme.palette.light};
`;

export const ParentDiv = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;