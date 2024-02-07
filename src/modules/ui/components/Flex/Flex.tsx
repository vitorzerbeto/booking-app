import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacings.small};
`;
