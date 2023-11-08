import styled from "styled-components";
import {Outlet} from "react-router-dom";

const Wrapper = styled.div``;

const MainLayout = () => {
    // todo: if user is not logged in, redirect to main page "/"

    return (
        <Wrapper data-cy={'main-pages'}>
            {/*todo add the header and bottom navigation*/}
            <Outlet/>
        </Wrapper>
    );
};

export default MainLayout