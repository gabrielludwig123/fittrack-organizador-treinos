
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function PerfilScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>FT</Text>
        </View>

        <Text style={styles.titulo}>Sobre o FitTrack</Text>

        <Text style={styles.subtitulo}>
          Organização para evoluir.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.etiqueta}>NOSSA MISSÃO</Text>

        <Text style={styles.cardTitulo}>
          Treinos mais organizados.
        </Text>

        <Text style={styles.texto}>
          O FitTrack foi pensado para ajudar
          pessoas a organizar seus exercícios e
          visualizar sua rotina de treinos em
          uma única aplicação.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.etiqueta}>O PROBLEMA</Text>

        <Text style={styles.cardTitulo}>
          Menos desorganização.
        </Text>

        <Text style={styles.texto}>
          Informações espalhadas e falta de
          planejamento podem dificultar a
          organização dos exercícios. O FitTrack
          propõe reunir essas informações em
          um ambiente simples.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.etiqueta}>PRÓXIMAS ETAPAS</Text>

        <Text style={styles.item}>
          ✓ Cadastro de treinos
        </Text>

        <Text style={styles.item}>
          ✓ Edição e exclusão de registros
        </Text>

        <Text style={styles.item}>
          ✓ Cadastro e login de usuários
        </Text>

        <Text style={styles.item}>
          ✓ Controle de acesso por perfil
        </Text>

        <Text style={styles.nota}>
          Funcionalidades previstas, ainda não
          implementadas nesta versão.
        </Text>
      </View>

      <Text style={styles.rodape}>
        FITTRACK · SUA ROTINA, MAIS ORGANIZADA.
      </Text>
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
    padding: 28,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#243249',
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#263E32',
    borderWidth: 2,
    borderColor: '#8BE35D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTexto: {
    color: '#8BE35D',
    fontSize: 24,
    fontWeight: '900',
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  subtitulo: {
    color: '#A9B7CA',
    fontSize: 14,
    marginTop: 7,
  },
  card: {
    backgroundColor: '#17263A',
    borderColor: '#30445B',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 18,
  },
  etiqueta: {
    color: '#8BE35D',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  cardTitulo: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 9,
  },
  texto: {
    color: '#B4C0D0',
    fontSize: 14,
    lineHeight: 23,
  },
  item: {
    color: '#D5DFEC',
    fontSize: 14,
    marginTop: 13,
  },
  nota: {
    color: '#8D9CB0',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 15,
  },
  rodape: {
    color: '#66768D',
    fontSize: 10,
    letterSpacing: 1,
    textAlign: 'center',
    margin: 25,
  },
});
