import { Body } from "./styles";
import { Spinner } from "@ui-kitten/components";

const LoadingComponent = () => {
    return (
        <Body>
            <Spinner size="giant" status="danger"/>
        </Body>
    );
};

export default LoadingComponent;
