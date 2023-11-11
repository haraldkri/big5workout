import styled from "styled-components";
import {Outlet} from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SubpageWrapper = styled.div`
  flex-grow: 1;
`;

const MainLayout = () => {
    // todo: if user is not logged in, redirect to main page "/"

    return (
        <Wrapper data-cy={'main-page'}>
            {/*todo add the header and bottom navigation*/}
            <AppHeader/>
            <SubpageWrapper>
                <Outlet/>
            </SubpageWrapper>
            <AppFooter/>
        </Wrapper>
    );
};

export default MainLayout