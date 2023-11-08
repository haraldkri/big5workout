import styled from "styled-components";
import {Outlet} from "react-router-dom";

const Wrapper = styled.div``;

const Workout = () => {
    return (
        <Wrapper data-cy={'workout-page'}>
            {/*todo add exercise list cards*/}
            <Outlet/>
        </Wrapper>
    );
};

export default Workout