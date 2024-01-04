import styled from "styled-components";
import AddExerciseForm from "../../../components/AddExerciseForm";

const Wrapper = styled.div``;

const AddExercise = () => {
    return (
        <Wrapper data-cy={'add-exercise-page'}>
            <AddExerciseForm/>
        </Wrapper>
    );
};

export default AddExercise