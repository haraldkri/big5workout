import styled from "styled-components";
import {useParams} from "react-router-dom";
import AddRecordForm from "../../../components/AddRecordForm";
import {useFirestore, useFirestoreCollectionData, useUser} from "reactfire";
import {collection, query, where} from "firebase/firestore";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorView from "../../../components/ErrorView";

const Wrapper = styled.div``;

const Workout = () => {
    const {exerciseKey} = useParams();
    const firestore = useFirestore();
    const {data: user} = useUser();

    const {data, status} = useFirestoreCollectionData(
        query(
            collection(firestore, `users/${user?.uid}/workouts`),
            where('key', '==', exerciseKey)
        )
    );

    if (status === 'loading') return <LoadingSpinner/>
    if (status === 'error') return <ErrorView/>

    return (
        <Wrapper data-cy={'workout-page'}>
            {
                data && <AddRecordForm exerciseIds={data[0]?.exerciseIds ?? []}/>
            }

        </Wrapper>
    );
};

export default Workout