import {FC, useContext, useEffect, useState} from "react";
import {Button, Form, Input, message, theme, Transfer} from 'antd';
import {useFirestore} from "reactfire";
import {addDoc, collection, onSnapshot, query} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Center, FlexRow} from "../StyledComponents";
import styled from "styled-components";
import {Exercise, Workout} from "../../types.ts";
import {UserContext} from "../../context/UserContext.ts";
import {getName} from "../../utils/languageKeySelect.ts";

const FormRow = styled(FlexRow)`
  flex-grow: 1;
  flex-wrap: wrap;

  & > * {
    flex-grow: 1;
  }

  & button, & .ant-upload {
    width: 100%;
  }

  & > div {
    max-width: 100%;
  }
`;

const ItemDescription = styled.span<{ $textColor: string }>`
  font-size: 12px;
  color: ${({$textColor}) => $textColor};
  margin-left: 8px;
`;

const StyledTransfer = styled(Transfer)`
  @media (min-width: 701px) {
    & > .ant-transfer-list {
      height: 400px;
    }
  }
  @media (max-width: 700px) {
    flex-wrap: wrap;
  }
  justify-content: center;
  gap: 12px;
`;

function createIdFromName(name: string) {
    return name.toLowerCase().replace(/ /g, '-');
}

type ExerciseTransferItem = {
    key: string;
    title: string;
    description: string;
    chosen: boolean;
}


const AddWorkoutForm: FC = () => {
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();
    const firestore = useFirestore();
    const {user} = useContext(UserContext)
    const {token} = theme.useToken();
    const [loading, setLoading] = useState(false);
    const [exerciseList, setExerciseList] = useState<ExerciseTransferItem[]>([]);
    const [targetKeys, setTargetKeys] = useState<string[]>([]);

    useEffect(() => {
        if (!user?.uid) return

        setLoading(true)
        const q = query(collection(firestore, `exercises`));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setExerciseList(querySnapshot.docs.map((doc) => {
                const data = doc.data() as Exercise;
                return {
                    key: data.id,
                    title: getName(data, i18n.language) ?? "",
                    description: data.id,
                    chosen: false,
                }
            }));
            setLoading(false)
        });

        return () => unsubscribe();
    }, [user, firestore]);

    const handleChange = (newTargetKeys: string[]) => {
        setTargetKeys(newTargetKeys);
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const exerciseData: Workout = {
                name: {
                    de: values.germanName,
                    en: values.englishName
                },
                id: createIdFromName(values.englishName || values.germanName),
                exerciseIds: values.ids,
                createdAt: Date.now(),
                lastUsed: Date.now(),
            };

            const userWorkoutCollection = collection(firestore, `users/${user?.uid}/workouts`);
            await addDoc(userWorkoutCollection, {
                ...exerciseData,
            })
            message.success(t('The new workout was added successfully!'))
            navigate('/app')
        } catch (error) {
            message.error(t('An error occurred while adding the workout. Please try again later.'))
            console.error('Error occurred:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Form
                name="addWorkoutForm"
                layout={"vertical"}
                style={{maxHeight: "100%"}}
                onFinish={onFinish}
                autoComplete="off"
                disabled={loading}
            >
                <FormRow>
                    <Form.Item label={t('German Name')} name="germanName">
                        <Input type="text" placeholder={"Oberkörper"}/>
                    </Form.Item>
                    <Form.Item label={t('English Name')} name="englishName">
                        <Input type="text" placeholder={"Upper Body"}/>
                    </Form.Item>
                </FormRow>
                <FormRow>
                    <Form.Item label={t('ID')} name="ids" rules={[{required: true}]}>
                        <StyledTransfer
                            dataSource={exerciseList}
                            showSearch
                            listStyle={{
                                width: "100%"
                            }}
                            operations={[t("add"), t("remove")]}
                            targetKeys={targetKeys}
                            onChange={handleChange}
                            filterOption={(inputValue, item) => {
                                // Split the inputValue on whitespace
                                const words = inputValue.split(' ');

                                // Check if all words exist in item.title or item.description
                                return words.every((word) =>
                                    (item.title && item.title.toLowerCase().includes(word.toLowerCase())) ||
                                    (item.description && item.description.toLowerCase().includes(word.toLowerCase()))
                                );
                            }
                            }
                            render={(item) => <>
                                {item.title}
                                <ItemDescription
                                    $textColor={token?.colorTextDescription}>{item.description}</ItemDescription>
                            </>
                            }
                        />
                    </Form.Item>
                </FormRow>
                <Form.Item>
                    <Center>
                        <Button type="primary" htmlType="submit">
                            {t('Add Workout')}
                        </Button>
                    </Center>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddWorkoutForm;