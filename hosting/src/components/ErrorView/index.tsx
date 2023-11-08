import {Center} from "../StyledComponents";
import ServerError from "antd/es/result/serverError";

const ErrorView = () => {
    return <Center>
        <ServerError/>
    </Center>
}

export default ErrorView