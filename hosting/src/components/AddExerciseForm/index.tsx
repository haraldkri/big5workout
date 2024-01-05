import {FC, useState} from "react";
import {Button, Form, Input, message, Upload} from 'antd';
import {useFirestore, useStorage} from "reactfire";
import {addDoc, collection} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Center, FlexCol, FlexRow} from "../StyledComponents";
import {UploadOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {RcFile} from "antd/es/upload";

type Exercise = {
    germanName?: string,
    englishName?: string,
    id?: string,
    exerciseLink?: string,
    previewImage?: {
        srcUrl: string, // the url of the original image
        storageUrl: any // the image itself (low resolution)
    },
    images?: {
        srcUrl: string, // the url of the original image
        storageUrl: string // the url of the image in the firebase storage
    }[]
}

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


const AddExerciseForm: FC = () => {
    const [loading, setLoading] = useState(false);
    const [primaryPicture, setPrimaryPicture] = useState<RcFile | null>(null);
    const [secondaryPicture, setSecondaryPicture] = useState<RcFile | null>(null);
    const [previewPicture, setPreviewPicture] = useState<RcFile | null>(null);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const firestore = useFirestore();
    const storage = useStorage();

    const getImageStorageUrl = async (image: any, imageName: string, exerciseId: string) => {
        //Upload image to storage
        const newImageRef = ref(storage, `images/exercises/${exerciseId}/${imageName}`);
        await uploadBytesResumable(newImageRef, image);

        return await getDownloadURL(newImageRef);
    }

    const onFinish = async (values: any) => {
        setLoading(true);
        const primaryPictureUrl = primaryPicture ? await getImageStorageUrl(primaryPicture, 'primary', values.id) : "";
        const secondaryPictureUrl = secondaryPicture ? await getImageStorageUrl(secondaryPicture, 'secondary', values.id) : "";
        const previewPictureUrl = previewPicture ? await getImageStorageUrl(previewPicture, 'preview', values.id) : "";

        try {
            const exerciseData: Exercise = {
                germanName: values.germanName,
                englishName: values.englishName,
                id: values.id,
                exerciseLink: values.exerciseLink,
                previewImage: {
                    srcUrl: values.previewPictureSrc,
                    storageUrl: previewPictureUrl
                },
                images: [
                    {
                        srcUrl: values.primaryPictureSrc,
                        storageUrl: primaryPictureUrl
                    },
                    {
                        srcUrl: values.secondaryPictureSrc,
                        storageUrl: secondaryPictureUrl
                    }
                ]
            };

            const exerciseCollection = collection(firestore, 'exercises');
            await addDoc(exerciseCollection, {
                ...exerciseData,
                createdAt: new Date().getTime(),
            })
            message.success(t('The new exercise was added successfully!'))
            navigate('/app')
        } catch (error) {
            message.error(t('An error occurred while adding the exercise. Please try again later.'))
            console.error('Error occurred:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Form
                name="addExerciseForm"
                layout={"vertical"}
                style={{maxHeight: "100%"}}
                onFinish={onFinish}
                autoComplete="off"
                disabled={loading}
            >
                <FormRow>
                    <Form.Item label={t('German Name')} name="germanName" rules={[{required: true}]}>
                        <Input type="text" placeholder={"Brustpresse"}/>
                    </Form.Item>
                    <Form.Item label={t('English Name')} name="englishName" rules={[{required: true}]}>
                        <Input type="text" placeholder={"Chest Press"}/>
                    </Form.Item>
                </FormRow>
                <FormRow>
                    <Form.Item label={t('ID')} name="id" rules={[{required: true}]}>
                        <Input type="text" placeholder={"machine-chest-press"}/>
                    </Form.Item>
                    <Form.Item label={t('Exercise Link')}
                               tooltip={t("This is the link that will be opened when clicking on an image.")}
                               name="exerciseLink" rules={[{required: true}]}>
                        <Input type="text"
                               placeholder={"https://modusx.de/fitness-uebungen/brustpresse/brustpresse-mit-fokus-auf-die-mittlere-brust/"}/>
                    </Form.Item>
                </FormRow>
                <FormRow>
                    <FlexCol>
                        <Form.Item label={t('Primary Picture')} name="primaryPictureSrc">
                            <Input type="text" placeholder={"primary image source url"}/>
                        </Form.Item>
                        <Form.Item name="primaryPicture">
                            <Upload
                                listType="picture"
                                maxCount={1}
                                beforeUpload={(file) => {
                                    setPrimaryPicture(file);
                                    return false;
                                }}
                            >
                                <Button icon={<UploadOutlined/>}>Upload (Max: 1)</Button>
                            </Upload>
                        </Form.Item>
                    </FlexCol>
                    <FlexCol>
                        <Form.Item label={t('Secondary Picture')} name="secondaryPictureSrc">
                            <Input type="text" placeholder={"secondary image source url"}/>
                        </Form.Item>
                        <Form.Item name="secondaryPicture">
                            <Upload
                                listType="picture"
                                maxCount={1}
                                beforeUpload={(file) => {
                                    setSecondaryPicture(file);
                                    return false;
                                }}
                            >
                                <Button icon={<UploadOutlined/>}>Upload (Max: 1)</Button>
                            </Upload>
                        </Form.Item>
                    </FlexCol>
                    <FlexCol>
                        <Form.Item label={t('Preview Picture')} name="previewPictureSrc">
                            <Input type="text" placeholder={"preview image source url"}/>
                        </Form.Item>
                        <Form.Item name="previewPicture">
                            <Upload
                                listType="picture"
                                maxCount={1}
                                beforeUpload={(file) => {
                                    setPreviewPicture(file);
                                    return false;
                                }}
                            >
                                <Button icon={<UploadOutlined/>}>Upload (Max: 1)</Button>
                            </Upload>
                        </Form.Item>
                    </FlexCol>
                </FormRow>
                <Form.Item>
                    <Center>
                        <Button type="primary" htmlType="submit">
                            {t('Add Exercise')}
                        </Button>
                    </Center>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddExerciseForm;