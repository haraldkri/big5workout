import styled from "styled-components";
import {Outlet} from "react-router-dom";

const Wrapper = styled.div``;

const WorkoutList = () => {
    return (
        <Wrapper data-cy={'workout-list-page'}>
            {/*todo add button*/}
            <Outlet/>
        </Wrapper>
    );
};

export default WorkoutList