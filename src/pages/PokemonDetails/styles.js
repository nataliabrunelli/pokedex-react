import styled from "styled-components";

export const MainContainer = styled.main`
  width: 100%;
  max-width: 80%;
  min-height: calc(100vh - 71px);
  margin: 0 auto;
  background-color: ${({theme, bg}) => theme.colors[bg]};
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export const Col = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: ${({align}) => align};
  gap: ${({ gap }) => (gap ? gap : 0)}rem;
`

export const Row = styled.div`
  /* width: 100%; */
  display: flex;
  /* align-items: center; */
  gap: 1rem;
`

export const Grid = styled.ul`
  max-width: 50ch;
  max-height: 100px;
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  
  background-color:rgba(255, 255, 255, 0.2);
  padding: .5rem 1rem;
  border-radius: 3px;

  display: grid;
  grid-template-columns: repeat(${({col}) => col}, auto);
  gap: .85rem;

  b {
    text-transform: capitalize;
  }
`