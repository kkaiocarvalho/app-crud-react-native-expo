import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { getUser } from "./functions/getUser";
import { useState, useEffect } from "react";
import { Loading } from "../../components/";
import { Card, Text, Button, Icon } from "@ui-kitten/components";
import { Body } from "./styles";
import { ModalDelete } from "./components/modal";
import { removeUser } from "./functions/deleteUser";

const List = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [remove, setRemove] = useState(false);
    const [id, setId] = useState(null);

    useEffect(() => {
        const screen = navigation.addListener("focus", async () => {
            getUser(setData, setLoading, setError);
        });
        return screen; 
    }, [navigation, setData, setLoading, setError]);

    const confirmRemove = () => {
        removeUser(id, setLoading, setError, refresh);
    };

    const openModalDelete = (id) => {
        setId(id);
        setRemove(true);
    };

    const refresh = () => {
        setRemove(false);
        getUser(setData, setLoading, setError);
    };

    return (
        <ScrollView>
            <Body>
                <Button
                    style={{ marginBottom: 10, width: 150 }} 
                    onPress={() => navigation.navigate("Create")}
                >
                    Criar Usuário
                </Button>

                {loading && <Loading />}
                
                {!loading && data.length 
                    ? data.map((user, i) => (
                        <View key={i}
                            style={{ width: "100%", flexDirection: "row", justifyContent: "space-around" }}
                        >
                            <Card style={{ marginBottom: 5, width: "85%" }}>
                                <TouchableOpacity
                                    style={{ width: "100%" }}
                                    onPress={() => navigation.navigate("Create", { id: user.id })}
                                >
                                    <Text>{user.name}</Text>
                                </TouchableOpacity>
                            </Card>
                            <TouchableOpacity onPress={() => openModalDelete(user.id)}>
                                <Icon 
                                    style={styles.icon}
                                    fill="#FF0000"
                                    name="trash-outline"
                                />
                            </TouchableOpacity>
                        </View>         
                    ))
                    : null
                }

                {remove &&
                    <ModalDelete open={remove} close={() => setRemove(false)} confirm={confirmRemove} />
                }
            </Body>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 28,
        height: 28,
        marginTop: 9
    }
});

export default List;
