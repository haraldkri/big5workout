import styled from "styled-components";
import {Outlet} from "react-router-dom";

const Wrapper = styled.div``;

const WorkoutResult = () => {
    return (
        <Wrapper data-cy={'workout-result-page'}>
            workout result page
            <Outlet/>
        </Wrapper>
    );
};

export default WorkoutResult