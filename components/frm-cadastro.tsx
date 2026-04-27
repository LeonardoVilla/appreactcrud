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

export default function Cadastro() {

    const [nomeAluno, setNomeAluno] = useState('')
    const [idadeAluno, setIdadeAluno] = useState('')
    const [emailAluno, setEmailAluno] = useState('')
    
    const [loading, setLoading] = useState(false)

    async function cadAluno() {

        setLoading(true)

        const { data, error } = await supabase
            .from('tb_aluno')
            .insert([
                {
                    nome: nomeAluno, 
                    idade: idadeAluno, 
                    email: emailAluno
                },
            ])
        .select()

        if(error){
            setLoading(false)
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: error.message
            })
        }else{
            setLoading(false)
            Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: `Aluno ${data?.[0]?.nome} cadastrado com sucesso!`
            })
        }
        
    }

    return (
        <View style={styles.container}>
            <Text style={styles.Text}> Área Restrita</Text>

            <TextInput
                style={styles.Input}
                placeholder="Informe seu nome"
                value={nomeAluno}
                onChangeText={setNomeAluno}
            />

            <TextInput
                style={styles.Input}
                placeholder="Informe sua idade"
                value={idadeAluno}
                onChangeText={setIdadeAluno}
            />

            <TextInput
                style={styles.Input}
                placeholder="Informe seu e-mail"
                value={emailAluno}
                onChangeText={setEmailAluno}
            />

            <Toast />

            <TouchableOpacity style={styles.Button} onPress={cadAluno} disabled={loading}>
                <Text style={styles.Text}>Cadastrar Aluno</Text>
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