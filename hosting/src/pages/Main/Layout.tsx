import styled from "styled-components";
import {Outlet, useNavigate} from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import {useUser} from "reactfire";
import {App} from "antd";
import {useTranslation} from "react-i18next";
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
    // todo: if user is not logged in, redirect to main page "/"
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {message} = App.useApp();
    const user = useUser();

    if (!user) {
        message
            .error(t('You are not logged in. You will be redirected to the landing page in a moment.'))
            .then(() => navigate('/', {replace: true}))
    }
    return (
        <Wrapper data-cy={'main-page'}>
            {/*todo add the header and bottom navigation*/}
            <AppHeader/>
            <SubpageWrapper>
                <Content>
                    <Outlet context={user?.data?.uid}/>
                </Content>
            </SubpageWrapper>
            <AppFooter/>
        </Wrapper>
    );
};

export default MainLayout