import styled from "styled-components";
import {Outlet, useParams} from "react-router-dom";
import AddRecordForm from "../../../components/AddRecordForm";
import {useFirestore, useFirestoreDocData, useUser} from "reactfire";
import {doc} from "firebase/firestore";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorView from "../../../components/ErrorView";

const Wrapper = styled.div``;

const Workout = () => {
    //get the workout id from useParam hook
    const {id} = useParams();
    const firestore = useFirestore();
    const user = useUser();
    const uid = user?.data?.uid;

    const {data, status} = useFirestoreDocData(
        doc(firestore, `users/${uid}/workouts/${id}`),
    );

    if (status === 'loading') return <LoadingSpinner/>
    if (status === 'error') return <ErrorView/>

    return (
        <Wrapper data-cy={'workout-page'}>
            <AddRecordForm exerciseIds={data?.exerciseIds ?? []}/>
            <Outlet/>
        </Wrapper>
    );
};

export default Workout