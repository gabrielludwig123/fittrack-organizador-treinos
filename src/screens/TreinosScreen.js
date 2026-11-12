
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { buscarTreinos } from '../services/api';

export default function TreinosScreen({ route }) {
  const token = route.params?.token;

  const [treinos, setTreinos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregarTreinos = useCallback(async () => {
    if (!token) {
      setCarregando(false);
      Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
      return;
    }

    setCarregando(true);

    try {
      const dados = await buscarTreinos(token);
      setTreinos(Array.isArray(dados) ? dados : []);
    } catch (erro) {
      Alert.alert('Erro', erro.message);
    } finally {
      setCarregando(false);
    }
  }, [token]);

  useEffect(() => {
    carregarTreinos();
  }, [carregarTreinos]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>MEUS TREINOS</Text>

      <Text style={styles.subtitulo}>
        Acompanhe seus treinos cadastrados.
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={carregarTreinos}
      >
        <Text style={styles.botaoTexto}>Atualizar treinos</Text>
      </TouchableOpacity>

      {carregando ? (
        <ActivityIndicator size="large" color="#8BE35D" />
      ) : treinos.length === 0 ? (
        <Text style={styles.vazio}>
          Nenhum treino encontrado.
        </Text>
      ) : (
        treinos.map((treino) => (
          <View key={treino.id} style={styles.card}>
            <Text style={styles.nome}>{treino.nome}</Text>

            <Text style={styles.descricao}>
              {treino.descricao || 'Sem descrição'}
            </Text>

            <Text style={styles.detalhe}>
              Categoria: {treino.categoria || 'Não informada'}
            </Text>

            <Text style={styles.detalhe}>
              Duração: {treino.duracao || 'Não informada'}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1220',
    padding: 20,
  },
  titulo: {
    color: '#8BE35D',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
  },
  subtitulo: {
    color: '#A9B7CA',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#8BE35D',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 25,
  },
  botaoTexto: {
    color: '#0B1220',
    fontSize: 15,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#17263A',
    borderColor: '#30445B',
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  nome: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descricao: {
    color: '#A9B7CA',
    fontSize: 14,
    marginBottom: 12,
  },
  detalhe: {
    color: '#8BE35D',
    fontSize: 13,
    marginTop: 5,
  },
  vazio: {
    color: '#A9B7CA',
    textAlign: 'center',
    marginTop: 30,
  },
});
