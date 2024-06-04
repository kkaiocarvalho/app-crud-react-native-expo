import { View, Pressable, Keyboard } from "react-native";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Body, Spacing } from "./styles";
import { Text, Input, Button } from "@ui-kitten/components";
import { ModalComponent } from "./components/modal";
import { Loading } from "../../components";

import { postUser } from "./functions/postUser";
import { getUserById } from "./functions/getUserById";
import { updateUser } from "./functions/putUser";

const Create = ({route, navigation}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const schema = yup.object({
        name: yup.string().required("Campo obrigatório"),
        email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
        password: yup.string().required("Campo obrigatório").min(6, "Mínimo de 6 caracteres"),
        phone: yup.string().nullable()
    });

    const schemaUpdate = yup.object({
        name: yup.string().required("Campo obrigatório"),
        email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
        password: yup.string().nullable().min(6, "Mínimo de 6 caracteres"),
        phone: yup.string().nullable()
    });

    const { handleSubmit, control, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(id ? schema : schemaUpdate)
    });

    const save = (data) => {
        if(!id){
            postUser(data, setLoading, setError, setSuccess);
        } else {
            if(!data.password){
                delete data.password;
            }
            updateUser(id, data, setLoading, setError, setSuccess);
        }
    };

    const closeModal = () => {
        setSuccess(false);
        navigation.navigate("List")
    }

    const id = route?.params?.id;

    useEffect(() => {
        console.log(id);
    }, [id]);

    useEffect(() => {
        const screen = navigation.addListener("focus", async () => {
            if(id) {
                const response = await getUserById(id, setLoading, setError);
                setValue("name", response?.name);
                setValue("email", response?.email);
                setValue("phone", response?.phone);
                setLoading(false);

            }
        });
        return screen; 
    }, [navigation]);

    return (
        <Body style={{ alignItems: "center", justifyContent: "center" }} onPress={Keyboard.dismiss}>
            {loading && <Loading />}
            {!loading && (
                <View style={{ width: 250 }} >
                    <Text>Nome:</Text>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                onChangeText={value => onChange(value)}
                                value={value}
                                placeholder="Digite o nome"
                                size="medium"
                            />
                        )}
                    />
                    {errors?.name && <Text status="danger">{errors?.name?.message}</Text>}
                    <Spacing />
    
                    <Text>E-mail:</Text>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                onChangeText={value => onChange(value)}
                                value={value}
                                placeholder="Digite o e-mail"
                                size="medium"
                            />
                        )}
                    />
                    {errors?.email && <Text status="danger">{errors?.email?.message}</Text>}
                    <Spacing />
    
                    <Text>Senha:</Text>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                onChangeText={value => onChange(value)}
                                value={value}
                                placeholder="Digite a senha"
                                size="medium"
                                secureTextEntry={true}
                            />
                        )}
                    />
                    {errors?.password && <Text status="danger">{errors?.password?.message}</Text>}
                    <Spacing />
    
                    <Text>Telefone:</Text>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                onChangeText={value => onChange(value)}
                                value={value}
                                placeholder="Digite o telefone"
                                size="medium"
                            />
                        )}
                    />
                    {errors?.phone && <Text status="danger">{errors?.phone?.message}</Text>}
                    <Spacing />
    
                    <Button onPress={handleSubmit(save)} disabled={loading}>Salvar</Button>
                </View>
            )}
            {success && 
                <ModalComponent open={success} close={() => closeModal()} message={id ? "Usuário editado com sucesso!" : "Usuário criado com sucesso!"} />
            }
    
            {error && 
                <ModalComponent open={error} close={() => setError(false)} message={id ? "Erro ao editar usuário!" : "Erro ao criar usuário!"} />
            }
        </Body>
    );
    
};

export default Create;
