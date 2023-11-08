import styled from "styled-components";
import {Outlet} from "react-router-dom";

const Wrapper = styled.div``;

const Profile = () => {
    return (
        <Wrapper data-cy={'profile-page'}>
            <Outlet/>
        </Wrapper>
    );
};

export default Profile