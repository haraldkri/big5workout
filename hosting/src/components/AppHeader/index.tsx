import styled from "styled-components";
import {FlexGrow} from "../StyledComponents";
import {SmallLogo} from "../svg";
import usePageTitle from "../../hooks/usePageTitle";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px 20px;
  background: ${({theme}) => theme.purple10};
`;

const Title = styled.h2`
  margin: 0;
`;

const Extra = styled.div`
  height: 33px;
  width: 33px;

  & > svg {
    height: 100%;
    width: 100%;
  }
`;

const AppHeader = () => {
    const title = usePageTitle();

    return (
        <Wrapper data-cy="page-header">
            <FlexGrow>
                <Title data-cy="workout-title">{title}</Title>
            </FlexGrow>
            <Extra>
                <SmallLogo data-cy="application-logo"/>
            </Extra>
        </Wrapper>
    );
}

export default AppHeader;