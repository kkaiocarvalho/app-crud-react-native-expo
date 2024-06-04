import { useNavigation } from '@react-navigation/native';
import { Modal, Button, Text, Card } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        minHeight: 192,
    },
    backdrop: {
        backgroundColor: "rgba(0,0,0,0.5)",
    },
});

export const ModalComponent = ({ open, close, message }) => {
    const navigation = useNavigation();

    return (
        <Modal visible={open} backdropStyle={styles.backdrop} onBackdropPress={close}>
            <Card disabled={true}>
                <Text style={{ marginBottom: 20 }}>{message}</Text>
                <Button onPress={close}>Fechar</Button>
            </Card>
        </Modal>
    );
};
