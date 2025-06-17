import styled from "styled-components";

export const CardContainer = styled.div`
  max-width: 250px;
  height: 250px;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({theme, bg}) => theme.colors[bg]};
  cursor: pointer;
`;

export const Name = styled.h2`
  text-transform: capitalize;
`