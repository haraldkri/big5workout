import React, {FC, useEffect} from "react";
import {Button, Form, message} from 'antd';
import ExerciseInputCard from "../ExerciseInputCard";
import {ExerciseValue} from "../../types.ts";
import {useFirestore, useUser} from "reactfire";
import {addDoc, collection, doc, setDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {CenterInline} from "../StyledComponents";

type Values = Record<string, ExerciseValue>;

type Props = {
    exerciseIds: string[],
    showExerciseImages?: boolean
}

const AddRecordForm: FC<Props> = ({exerciseIds, showExerciseImages}) => {
    const [loading, setLoading] = React.useState(false);
    const [values, setValues] = React.useState<Values>({});
    const navigate = useNavigate();
    const {t} = useTranslation();
    const firestore = useFirestore();
    const {data: user} = useUser();

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
        setLoading(true);
        const promises: Promise<any>[] = [];
        for (const [exerciseId, value] of Object.entries(values as Values)) {
            if (!value || !value.duration || !value.weight) continue;

            // Update the latest record entry in the exercises collection
            const latestRecordEntry = doc(firestore, `users/${user?.uid}/exercises/${exerciseId}`);
            promises.push(
                setDoc(latestRecordEntry, {
                    latestRecord: {
                        timestamp: new Date().getTime(),
                        ...value
                    }
                })
            );

            // Add the record to the records collection
            const recordCollection = collection(firestore, `users/${user?.uid}/exercises/${exerciseId}/records`);
            promises.push(
                addDoc(recordCollection, {
                    timestamp: new Date().getTime(),
                    ...value
                })
            );
        }

        try {
            await Promise.all(promises);
            navigate('/app/workout/result')
        } catch (error) {
            console.error('Error occurred:', error);
            message.error(t('There was an error while saving your workout. Please try again.'))
        } finally {
            setLoading(false);
        }
    };

    return (//todo: make the workout page have an active state (so that when user switches to another tab, the workout is not lost)
        <div>
            <Form
                name="addWorkoutRecordForm"
                onFinish={onFinish}
                autoComplete="off"
                disabled={loading}
            >
                {
                    exerciseIds.map((exerciseId, index) => {
                        return <Form.Item name={exerciseId} style={{marginBottom: "20px"}} key={index}>
                            <ExerciseInputCard exerciseId={exerciseId}
                                               onChange={(newValue) => onValueChange(exerciseId, newValue)}
                                               useMinView={!showExerciseImages}/>
                        </Form.Item>
                    })
                }
                <Form.Item>
                    <CenterInline>
                        <Button type="primary" htmlType="submit">
                            {t('Finish Workout')}
                        </Button>
                    </CenterInline>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddRecordForm;