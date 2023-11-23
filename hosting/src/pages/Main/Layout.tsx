import styled from "styled-components";
import {Outlet} from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import {Content} from "../../components/StyledComponents";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SubpageWrapper = styled.div`
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: scroll;
  margin: 10px;
`;

const MainLayout = () => {
    return (
        <Wrapper data-cy={'main-page'}>
            <AppHeader/>
            <SubpageWrapper>
                <Content>
                    <Outlet/>
                </Content>
            </SubpageWrapper>
            <AppFooter/>
        </Wrapper>
    );
};

export default MainLayout