import { supabase } from "@/lib/supabase";
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';


interface Aluno {
    id: number;
    nome: string;
    idade: number;
    email: string;
}

export default function ConsultarAluno() {
    const [alunos, setAlunos] = useState<Aluno[]>([])
    const router = useRouter();

    useEffect(() => {
        getAlunos()
    }, [])

    async function getAlunos() {
        let { data, error } = await supabase
            .from('alunos')
            .select('*')

        if (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: error.message
            })
        } else {
            setAlunos((data as Aluno[]) || [])
        }
    }

    async function handleDelete(id: number) {
        const { error } = await supabase.from('alunos').delete().eq('id', id);
        if (error) {
            Toast.show({ type: 'error', text1: 'Erro!', text2: error.message });
        } else {
            setAlunos(alunos.filter(aluno => aluno.id !== id));
            Toast.show({ type: 'success', text1: 'Aluno deletado!' });
        }
    }

    return (
        <View style={styles.container}>
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
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.button, styles.deleteButton]}
                                onPress={() => handleDelete(item.id)}
                            >
                                <Text style={styles.buttonText}>Deletar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.cadastroButton]}
                                onPress={() => router.push('/(tabs)/cadastro')}
                            >
                                <Text style={styles.buttonText}>Cadastrar</Text>
                            </TouchableOpacity>
                        </View>
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    button: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    deleteButton: {
        backgroundColor: '#ef4444',
    },
    cadastroButton: {
        backgroundColor: '#2563eb',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
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
})