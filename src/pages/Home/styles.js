import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`

export const MainContainer = styled.main`
  width: 100%;
  max-width: 80%;
  background-color: ${({theme}) => theme.colors.surface};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CardContainer = styled.ol`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 48px);
  padding: 2rem 0;
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: center;
  gap: 1rem;
`

export const Loading = styled.button`
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