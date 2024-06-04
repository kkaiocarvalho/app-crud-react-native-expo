import { useNavigation } from '@react-navigation/native';
import { Modal, Button, Text, Card } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        minHeight: 192,
    },
    backdrop: {
        backgroundColor: "rgba(0,0,0,0.5)",
    },
});

export const ModalDelete = ({ open, close, confirm }) => {
    const navigation = useNavigation();

    return (
        <Modal visible={open} backdropStyle={styles.backdrop} onBackdropPress={close}>
            <Card disabled={true}>
                <Text style={{ marginBottom: 20 }}>Deseja realmente deletar este usuário?</Text>
                <View style={{ flexDirection: "row", justifyContent: "center", gap: 20 }}>
                <Button onPress={confirm} status='danger'>Sim</Button>
                <Button onPress={close}>Não</Button>
                </View>
                
            </Card>
        </Modal>
    );
};
