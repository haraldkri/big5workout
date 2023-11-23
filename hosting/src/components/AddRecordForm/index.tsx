import React, {FC, useEffect} from "react";
import {Button, Form, message} from 'antd';
import ExerciseInputCard from "../ExerciseInputCard";
import {ExerciseValue} from "../../types.ts";
import {useFirestore, useUser} from "reactfire";
import {addDoc, collection} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

type Values = Record<string, ExerciseValue>;

type Props = {
    exerciseIds: string[]
}

const AddRecordForm: FC<Props> = ({exerciseIds}) => {
    const [loading, setLoading] = React.useState(false);
    const [values, setValues] = React.useState<Values>({}); // State for the rating
    const navigate = useNavigate();
    const {t} = useTranslation();
    const firestore = useFirestore();
    const user = useUser();
    const uid = user?.data?.uid;

    useEffect(() => {
        const initialValues = exerciseIds.reduce((acc, curr) => {
            acc[curr] = {};
            return acc;
        }, {} as Values);

        setValues(initialValues)
    }, [exerciseIds]);

    const onValueChange = (exerciseId: string, newValue: ExerciseValue) => {
        if (exerciseId && newValue) setValues({
            ...values,
            [exerciseId]: {
                ...newValue
            }
        })
    }

    const onFinish = async (values: any) => {
        message.success('Successfully added new preference:');

        setLoading(true);
        const promises = [];
        for (const [exerciseId, value] of Object.entries(values as Values)) {
            const recordCollection = collection(firestore, `users/${uid}/exercises/${exerciseId}/records`);
            promises.push(addDoc(recordCollection, {
                timestamp: new Date().getTime(),
                ...value
            }));
        }

        try {
            // Wait for all promises to resolve
            await Promise.all(promises);
            navigate('/app/workout/result')
        } catch (error) {
            // TODO Handle the case where some promises have resolved while others have not
            // Handle errors that might occur in any of the promises
            console.error('Error occurred:', error);
            message.error(t('There was an error while saving your workout. Please try again.'))
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Form
                name="addWorkoutRecordForm"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600, maxHeight: "100%"}}
                onFinish={onFinish}
                autoComplete="off"
                disabled={loading}
            >
                {
                    exerciseIds.map((exerciseId) => {
                        return <Form.Item name={exerciseId} style={{marginBottom: "20px"}}>
                            <ExerciseInputCard exerciseId={exerciseId}
                                               onChange={(newValue) => onValueChange(exerciseId, newValue)}/>
                        </Form.Item>
                    })
                }
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddRecordForm;