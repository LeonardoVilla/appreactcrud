import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { supabase } from '@/lib/supabase';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function AlterarAluno() {
    // Recebe os dados do aluno via query params
    const { id, nome, idade, email } = useLocalSearchParams();
    const router = useRouter();

    // Inicializa os estados com os dados recebidos
    const [nomeAluno, setNomeAluno] = useState(nome as string || '');
    const [idadeAluno, setIdadeAluno] = useState(idade as string || '');
    const [emailAluno, setEmailAluno] = useState(email as string || '');
    const [loading, setLoading] = useState(false);

    async function alterarAluno() {
        setLoading(true);
        // Atualiza apenas nome e idade, mantendo o e-mail original
        const { error } = await supabase
            .from('alunos')
            .update({
                nome: nomeAluno,
                idade: idadeAluno
            })
            .eq('id', id);
        if (error) {
            setLoading(false);
            let msg = 'Erro desconhecido ao alterar aluno.';
            if (typeof error === 'string') {
                msg = error;
            } else if (error && typeof error.message === 'string') {
                msg = error.message;
            } else if (error && error.toString) {
                msg = error.toString();
            }
            console.error('Erro ao alterar aluno:', error);
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: msg
            });
        } else {
            setLoading(false);
            Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: `Aluno alterado com sucesso!`
            });
            // Volta para a tela anterior após alteração
            setTimeout(() => router.back(), 1000);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.Text}>Alterar Aluno</Text>

            <TextInput
                style={styles.Input}
                placeholder="Informe o nome"
                value={nomeAluno}
                onChangeText={setNomeAluno}
            />

            <TextInput
                style={styles.Input}
                placeholder="Informe a idade"
                value={idadeAluno}
                onChangeText={setIdadeAluno}
            />

            <TextInput
                style={styles.Input}
                placeholder="Informe o e-mail"
                value={emailAluno}
                editable={false} // impede edição do e-mail
            />

            <Toast />

            <TouchableOpacity style={styles.Button} onPress={alterarAluno} disabled={loading}>
                <Text style={styles.Text}>Salvar Alterações</Text>
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
});
