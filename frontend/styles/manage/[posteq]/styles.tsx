import styled from "styled-components";

export const Wrapper = styled.section`
  margin: 5% auto;
  max-width: 1240px;
  width: 100%;
  background-color: "#fafafa";
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  .title {
    color: ${props => props.theme.color.mainGreen};
    margin: 4%;
  }
`;
