import styled from "styled-components";
import AddWorkoutForm from "../../../components/AddWorkoutForm";

const Wrapper = styled.div``;

const AddWorkout = () => {
    return (
        <Wrapper data-cy={'add-exercise-page'}>
            <AddWorkoutForm/>
        </Wrapper>
    );
};

export default AddWorkout