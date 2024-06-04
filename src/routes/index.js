import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import List from '../screens/list';
import Create from '../screens/create/index';

const Routes = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='List'>
                <Stack.Screen name='List' component={List} options={{title: "Usuários"}} />
                <Stack.Screen name='Create' component={Create} options={{title: "Criar usuário"}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Routes