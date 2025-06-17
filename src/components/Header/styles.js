import styled from "styled-components";
import { Link } from "react-router";

export const Container = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid ${({theme}) => theme.colors.border};
`

export const HeaderContainer = styled.header`
  width: 100%;
  max-width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto
`

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const Select = styled.select`
  padding: 2px 12px 2px 6px;
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({theme}) => theme.colors.border};
  border-radius: 3px;
`

export const SwitcherButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Home = styled(Link)`
  background-color: ${({theme}) => theme.colors.accent};
  color: ${({theme}) => theme.colors.textPrimary};
  padding: 6px 12px;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`