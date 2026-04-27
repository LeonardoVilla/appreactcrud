
// Importa o supabase para acessar o banco de dados
import { supabase } from "@/lib/supabase";
// Importa hooks do React
import { useEffect, useState } from "react";
// Hook para saber se a tela está em foco
import { useIsFocused } from '@react-navigation/native';
// Componentes do React Native
import { FlatList, StyleSheet, Text, View } from "react-native";
// Biblioteca para mostrar mensagens de erro
import Toast from 'react-native-toast-message';


// Define o tipo dos dados do aluno
interface Aluno {
    id: number;
    nome: string;
    idade: number;
    email: string;
}


// Componente principal que exibe a lista de alunos
export default function ConsultarSimples() {
    // Estado para armazenar a lista de alunos
    const [alunos, setAlunos] = useState<Aluno[]>([])
    // Hook para saber se a tela está em foco
    const isFocused = useIsFocused();

    // useEffect: executa quando a tela fica em foco
    useEffect(() => {
        if (isFocused) {
            getAlunos(); // Busca os alunos do banco
        }
    }, [isFocused]);

    // Função para buscar alunos no banco
    async function getAlunos() {
        let { data, error } = await supabase
            .from('alunos')
            .select('*')
            .order('nome', { ascending: true }) // Ordena por nome
        if (error) {
            Toast.show({ type: 'error', text1: 'Erro!', text2: error.message })
        } else {
            setAlunos((data as Aluno[]) || [])
        }
    }

    // Renderiza a lista de alunos usando FlatList
    return (
        <View style={styles.container}>
            {/* FlatList exibe a lista de alunos de forma eficiente */}
            <FlatList
                data={alunos}
                keyExtractor={(item: Aluno) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<Text style={styles.title}>Alunos cadastrados</Text>}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhum aluno encontrado.</Text>}
                renderItem={({ item }: { item: Aluno }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.nome}</Text>
                        <Text style={styles.meta}>Idade: {item.idade}</Text>
                        <Text style={styles.meta}>Email: {item.email}</Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 16,
    },
    listContent: {
        flexGrow: 1,
        paddingTop: 50,
        paddingBottom: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    meta: {
        fontSize: 14,
        color: '#4b5563',
        marginBottom: 4,
    },
    emptyText: {
        textAlign: 'center',
        color: '#6b7280',
        fontSize: 16,
        marginTop: 32,
    },
});