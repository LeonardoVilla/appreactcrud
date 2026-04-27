
import {View, Text, TextInput, Button} from 'react-native';
import { useState } from 'react';
export default function Login() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    return (
        <View>
            <Text> Área Restrita</Text>
            <TextInput value={usuario} onChangeText={setUsuario} />
            <TextInput value={senha} onChangeText={setSenha} />
            <Button title="Entrar" onPress={() => {}} />
        </View>
    );
}