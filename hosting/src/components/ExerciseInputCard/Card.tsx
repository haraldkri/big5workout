import ContentCard from "../ContentCard";
import styled from "styled-components";
import {Carousel, Divider, Input, Skeleton, Typography} from "antd";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {formatSeconds, reverseFormatSeconds} from "../../utils/formatTime.ts";
import {formatWeight, reverseFormatWeight} from "../../utils/formatWeight.ts";
import {useEffect, useState} from "react";
import ExercisePickerModal from "../ExercisePickerModal";
import {Center, Grow} from "../StyledComponents";
import {useTranslation} from "react-i18next";

const ExerciseTitle = styled.h5`
  color: ${({theme}) => theme.colorPrimary};
  margin: 0;
`;

const Item = styled.div`
  height: 160px;
  padding: 10px 0;
  position: relative;

  & span.lazy-load-image-background {
    // Inline styles where used in the library, but we need to override them (react-lazy-load-image-component)
    background-size: contain !important;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    margin: auto;
  }

  & span.lazy-load-image-background.lazy-load-image-loaded {
    height: 100%;
    width: 100%;
  }

  & img {
    margin: auto;
    height: 100%;
  }

  & button {
    color: ${({theme}) => theme.colorText};
  }
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
`;

const CustomDivider = styled(Divider)`
  height: 20px;
`;

export type Props = {
    value?: {
        weight: number,
        duration: number
    },
    onChange?: (value: { weight: number, duration: number }) => void,
    useMinView?: boolean,
    title?: string,
    latestWeight?: number,
    latestDuration?: number,
    images?: {
        /// Placeholder image to show while the actual image is loading, or if the image fails to load
        /// Should be a low resolution image of the actual image
        /// This is optional, if not provided, a default placeholder will be used
        placeholderUrl?: string,
        /// The url of the actual image file
        url?: string,
        /// The url where the original image can be found
        link?: string,
        /// The alt text of the image
        alt?: string
    }[],
}

type ModalConfig = {
    type: "weight" | "duration",
    value?: number
}

const defaultWeight = 0;
const defaultDuration = 90;
const defaultValue = {weight: defaultWeight, duration: defaultDuration}

const Card = (props: Props) => {
    const {useMinView, value, onChange, images, title, latestDuration, latestWeight} = props;
    const {t} = useTranslation();

    const [weight, setWeight] = useState<string>(formatWeight(value?.weight ?? latestWeight ?? defaultWeight));
    const [duration, setDuration] = useState<string>(formatSeconds(value?.duration ?? latestDuration ?? defaultDuration));
    const [modalOpen, setModalOpen] = useState(false);
    const [modalPickerConfig, setModalPickerConfig] = useState<ModalConfig | undefined>(undefined);

    const onValueChange = (name: "weight" | "duration", newValue: number) => {
        if (name && newValue && onChange) onChange({
            ...(value ?? defaultValue),
            [name]: newValue
        })
    };

    useEffect(() => {
        if (value) {
            const weight = value.weight ?? latestWeight ?? defaultWeight;
            setWeight(formatWeight(weight));

            const duration = value.duration ?? latestDuration ?? defaultDuration;
            setDuration(formatSeconds(duration));
        }
    }, [value]);

    const handleImageClick = (link: string) => {
        window.open(link, '_blank');
    }

    const handleInputClick = (name: string) => {
        if (name === 'weight') {
            setModalPickerConfig({
                type: 'weight',
                value: weight
                    ? reverseFormatWeight(weight)
                    : Number.isFinite(latestWeight)
                        ? latestWeight
                        : defaultWeight
            })
        } else if (name === 'duration') {
            setModalPickerConfig({
                type: 'duration',
                value: reverseFormatSeconds(duration ?? defaultDuration)
            })
        }

        setModalOpen(true);
    }

    const handleModalClose = (type: "weight" | "duration", newValue: number) => {
        if (type === 'weight') {
            onValueChange(type, Number(newValue));
        } else if (type === 'duration') {
            onValueChange(type, Number(newValue));
        }

        setModalOpen(false);
    }

    return <ContentCard>
        <ExerciseTitle>{title}</ExerciseTitle>
        {
            !useMinView && <Carousel>
                {images && images.map((image, index) => {
                    const {placeholderUrl, url, link} = image;
                    return <Item key={index}>
                        <LazyLoadImage
                            placeholder={<Center><Skeleton.Image active={true}/></Center>}
                            placeholderSrc={placeholderUrl}
                            src={url}
                            alt={title}
                            onClick={() => link && handleImageClick(link)}
                        />
                    </Item>
                })}
            </Carousel>
        }

        <InputRow>
            <Grow>
                <Typography.Text>{t('Weight')}</Typography.Text>
            </Grow>
            <CustomDivider type={"vertical"} style={{opacity: 0}}/>
            <Grow>
                <Typography.Text>{t('Duration')}</Typography.Text>
            </Grow>
        </InputRow>
        <InputRow>
            <Input placeholder={formatWeight(latestWeight ?? defaultWeight)} value={weight} suffix={"kg"}
                   onChange={(e) => onValueChange("weight", Number(e.target.value))}
                   onClick={() => handleInputClick("weight")}/>
            <CustomDivider type="vertical"/>
            <Input placeholder={formatSeconds(latestDuration ?? defaultDuration)} value={duration} suffix={"m:ss"}
                   onChange={(e) => onValueChange("duration", Number(e.target.value))}
                   onClick={() => handleInputClick("duration")}/>
        </InputRow>
        <ExercisePickerModal
            open={modalOpen}
            onConfirm={handleModalClose}
            onClose={() => setModalOpen(false)}
            type={modalPickerConfig?.type ?? "weight"}
            value={modalPickerConfig?.value}
        />


    </ContentCard>
}

export default Card;

/*
* Thanks to Victor Eke, the author of the article on how to use lazy loading images in React.
* https://www.freecodecamp.org/news/how-to-lazy-load-images-in-react/
*/