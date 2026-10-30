
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>FITTRACK</Text>
        <Text style={styles.subtitulo}>
          Seu treino. Sua evolução.
        </Text>
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.saudacao}>OLÁ, ATLETA!</Text>

        <Text style={styles.titulo}>
          Pronto para o próximo nível?
        </Text>

        <Text style={styles.descricao}>
          Organize sua rotina e acompanhe seus
          treinos em um só lugar.
        </Text>

        <View style={styles.resumo}>
          <Text style={styles.resumoLabel}>
            SUA ROTINA
          </Text>
          <Text style={styles.resumoTitulo}>
            Consistência gera resultados.
          </Text>
          <Text style={styles.resumoTexto}>
            Planeje seus exercícios e mantenha
            o foco nos seus objetivos.
          </Text>
        </View>

        <Text style={styles.secao}>ACESSO RÁPIDO</Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Treinos')}
        >
          <View style={styles.botaoTexto}>
            <Text style={styles.botaoTitulo}>
              Meus treinos
            </Text>
            <Text style={styles.botaoDescricao}>
              Consulte os exercícios disponíveis
            </Text>
          </View>
          <Text style={styles.seta}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Perfil')}
        >
          <View style={styles.botaoTexto}>
            <Text style={styles.botaoTitulo}>
              Sobre o FitTrack
            </Text>
            <Text style={styles.botaoDescricao}>
              Conheça nosso objetivo
            </Text>
          </View>
          <Text style={styles.seta}>›</Text>
        </TouchableOpacity>

        <Text style={styles.rodape}>
          PEQUENOS PASSOS. GRANDES RESULTADOS.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1220',
  },
  header: {
    backgroundColor: '#111C2E',
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#243249',
  },
  logo: {
    color: '#8BE35D',
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: 2,
  },
  subtitulo: {
    color: '#A9B7CA',
    fontSize: 14,
    marginTop: 5,
  },
  conteudo: {
    padding: 22,
  },
  saudacao: {
    color: '#8BE35D',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 10,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 37,
    marginTop: 12,
  },
  descricao: {
    color: '#A9B7CA',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
  },
  resumo: {
    backgroundColor: '#17263A',
    borderWidth: 1,
    borderColor: '#30445B',
    padding: 20,
    borderRadius: 18,
    marginTop: 27,
  },
  resumoLabel: {
    color: '#8BE35D',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  resumoTitulo: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 12,
  },
  resumoTexto: {
    color: '#A9B7CA',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
  secao: {
    color: '#8D9CB0',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 30,
    marginBottom: 12,
  },
  botao: {
    backgroundColor: '#17263A',
    borderWidth: 1,
    borderColor: '#30445B',
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  botaoTexto: {
    flex: 1,
  },
  botaoTitulo: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoDescricao: {
    color: '#A9B7CA',
    fontSize: 13,
    marginTop: 6,
  },
  seta: {
    color: '#8BE35D',
    fontSize: 30,
    marginLeft: 12,
  },
  rodape: {
    color: '#66768D',
    fontSize: 10,
    textAlign: 'center',
    letterSpacing: 1.2,
    marginTop: 28,
    marginBottom: 20,
  },
});
