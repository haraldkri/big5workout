import {FC, useEffect, useState} from "react";
import {Button, Modal} from "antd";
import ExercisePicker from "./ExercisePicker";
import {pickerConfigs} from "./pickerConfigs";
import {PickerValue} from "react-mobile-picker";
import {formatValue, parseValue} from "../../utils/picker";
import {useTranslation} from "react-i18next";
import {FlexRow, Grow} from "../StyledComponents";
import styled from "styled-components";

const CustomButton = styled(Button)`
  width: 100%;
`;

type Props = {
    open: boolean,
    onClose: () => void,
    type: "weight" | "duration",
    value?: number,
    onConfirm: (type: "weight" | "duration", newValue: number) => void
}

const ExercisePickerModal: FC<Props> = (props) => {
    const {open, type, value, onConfirm, onClose} = props;
    const {t} = useTranslation();
    const [pickerConfig, setPickerConfig] = useState(pickerConfigs[type]);
    const [pickerValue, setPickerValue] = useState<PickerValue>(formatValue(value ?? pickerConfig.defaultPickerValue, type));

    useEffect(() => {
        const pickerConfig = pickerConfigs[type];
        setPickerConfig(pickerConfig);
        setPickerValue(formatValue(value ?? pickerConfig.defaultPickerValue, type));
    }, [type, value]);

    const handleOk = () => {
        onConfirm(type, parseValue(pickerValue, type));
    }

    return <Modal
        open={open}
        onOk={handleOk}
        onCancel={onClose}
        footer={
            <FlexRow>
                <Grow>
                    <CustomButton key="back" onClick={onClose}>
                        {t("Cancel")}
                    </CustomButton>
                </Grow>
                <Grow>
                    <CustomButton key="confirm" type="primary" onClick={handleOk}>
                        {t("Confirm")}
                    </CustomButton>
                </Grow>
            </FlexRow>
        }>
        <ExercisePicker
            selections={pickerConfig.selections}
            value={pickerValue}
            onChange={setPickerValue}/>
    </Modal>
}

export default ExercisePickerModal;