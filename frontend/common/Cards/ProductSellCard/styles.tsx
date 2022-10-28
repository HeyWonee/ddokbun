import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  padding: 0px 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-auto-flow: row;

  position: relative;
  grid-gap: 50px;
  place-items: end;
  .img-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    place-self: right;
    padding: 0px 0px 0px 0px;
    width: 100%;
    max-width: 400px;

    min-width: 300px;
    align-items: center;
    text-align: center;
    img {
      vertical-align: middle;
    }
  }

  .text-wrap {
    margin-top: 80px;
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-self: start;

    gap: 20px;

    .text-top {
      h2 {
        padding: 0px;

        font-size: 60px;
        margin: 0;
        color: ${props => props.theme.color.mainGreen};
        font-family: ${props => props.theme.font.TitleFont};
      }
      h3 {
        font-size: 2em;
        line-height: 0.5em;
        color: ${props => props.theme.color.ivory};
      }
    }
    & > h3 {
      font-family: ${props => props.theme.font.EnglishFont};
      font-size: 50px;
    }
    .button-wrap {
      position: relative;
      display: flex;
      justify-content: flex-start;
      gap: 10px;
      z-index: 0;
    }
  }

  @media screen and (${props => props.theme.mobile}) {
    width: 100%;
    padding: 0px 0px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-auto-flow: row;
    grid-gap: 0px;
    place-items: end;
    .img-wrap {
      width: 100%;
      position: relative;
      max-width: 400px;
    }

    .text-wrap {
      margin-top: 60px;
      width: 100%;
      height: 70%;
      display: flex;
      justify-content: center;

      flex-direction: column;
      align-self: start;

      gap: 0px;

      .text-top {
        h2 {
          padding: 0px;
          font-size: 60px;
          margin-bottom: 0px;
          color: ${props => props.theme.color.mainGreen};
          font-family: ${props => props.theme.font.TitleFont};
        }
        h3 {
          font-size: 40px;
          line-height: 10px;
          color: ${props => props.theme.color.ivory};
        }
      }
      & > h3 {
        font-family: ${props => props.theme.font.EnglishFont};
        font-size: 50px;
        margin-top: 20px;
      }
      .button-wrap {
        z-index: 1;
        position: fixed;
        transform: translate(-50%, 0%);
        bottom: 20px;
        margin-top: 20px;
        left: 50%;
        display: flex;
        justify-content: flex-start;
        gap: 10px;
      }
    }
  }
`;