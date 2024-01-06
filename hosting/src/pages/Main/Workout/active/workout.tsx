import styled from "styled-components";
import {useParams} from "react-router-dom";
import AddRecordForm from "../../../../components/AddRecordForm";
import {useFirestore, useFirestoreCollectionData, useUser} from "reactfire";
import {collection, query, where} from "firebase/firestore";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import ErrorView from "../../../../components/ErrorView";
import {Radio, RadioChangeEvent} from "antd";
import {useState} from "react";
import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";
import {Content} from "../../../../components/StyledComponents";

const Wrapper = styled(Content)`
  padding: 0;
`;

const RadioGroup = styled(Radio.Group)`
  display: flex;
  justify-content: end;
`;

const Workout = () => {
    const {exerciseKey} = useParams();
    const firestore = useFirestore();
    const {data: user} = useUser();
    const [showExerciseImages, setShowExerciseImages] = useState<boolean>(true);

    const onChange = (e: RadioChangeEvent) => {
        setShowExerciseImages(e.target.value);
    };

    const {data, status} = useFirestoreCollectionData(
        query(
            collection(firestore, `users/${user?.uid}/workouts`),
            where('id', '==', exerciseKey)
        )
    );

    if (status === 'loading') return <LoadingSpinner/>
    if (status === 'error') return <ErrorView/>

    return (
        <Wrapper data-cy={'workout-page'}>
            <RadioGroup onChange={onChange} defaultValue={true}>
                <Radio.Button value={true}><EyeOutlined/></Radio.Button>
                <Radio.Button value={false}><EyeInvisibleOutlined/></Radio.Button>
            </RadioGroup>
            {
                data &&
                <AddRecordForm exerciseIds={data[0]?.exerciseIds ?? []} showExerciseImages={showExerciseImages}/>
            }

        </Wrapper>
    );
};

export default Workout