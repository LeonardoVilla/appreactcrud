import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { useState } from 'react';
//npm install react-native-toast-message
import Toast from 'react-native-toast-message';
import { supabase } from '@/lib/supabase';

import { router } from 'expo-router';//captura de rota

export default function Login() {

    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    
    const [loading, setLoading] = useState(false)

    async function validarLogin() {

        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({
            email: usuario,
            password: senha,
        })

        if(error){
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: error.message
            })
        }else{
            setLoading(false)
            router.replace('/(tabs)');
        }
        
    }

    return (
        <View style={styles.container}>
            <Text style={styles.Text}> Área Restrita</Text>

            <TextInput
                style={styles.Input}
                placeholder="Informe seu usuário"
                value={usuario}
                onChangeText={setUsuario}
            />

            <TextInput
                style={styles.Input}
                placeholder="Informe sua senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />

            <Toast />

            <TouchableOpacity style={styles.Button} onPress={validarLogin} disabled={loading}>
                <Text style={styles.Text}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    Text: {
        fontSize: 24, color: '#ffffff',
        marginBottom: 20,
    },
    Input: {
        width: '100%',
        height: 40,
        backgroundColor: '#ffffff',
        marginBottom: 20,
        color: '#000000'
    },
    Button: {
        width: '100%',
        height: 40,
        backgroundColor: '#c2e015',
        alignItems: 'center',
    },
})