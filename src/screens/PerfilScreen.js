
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function PerfilScreen({ navigation, route }) {
  const usuario = route.params?.usuario;

  function sair() {
    Alert.alert(
      'Sair do FitTrack',
      'Deseja realmente sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>FT</Text>
        </View>

        <Text style={styles.titulo}>Meu Perfil</Text>
        <Text style={styles.subtitulo}>
          Organização para evoluir.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.etiqueta}>MINHA CONTA</Text>

        <Text style={styles.cardTitulo}>
          {usuario?.nome || 'Usuário FitTrack'}
        </Text>

        <Text style={styles.texto}>
          Nível de acesso: {usuario?.nivel || 'Não informado'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.etiqueta}>SOBRE O FITTRACK</Text>

        <Text style={styles.cardTitulo}>
          Treinos mais organizados.
        </Text>

        <Text style={styles.texto}>
          O FitTrack ajuda você a organizar seus
          exercícios, cadastrar treinos e acompanhar
          sua rotina de atividades físicas.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botaoSair}
        onPress={sair}
      >
        <Text style={styles.botaoTexto}>
          SAIR DA CONTA
        </Text>
      </TouchableOpacity>

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
    fontSize: 11,
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
  botaoSair: {
    backgroundColor: '#542B36',
    borderWidth: 1,
    borderColor: '#A94455',
    marginHorizontal: 20,
    marginTop: 25,
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#FF9BA7',
    fontWeight: 'bold',
    fontSize: 15,
  },
  rodape: {
    color: '#66768D',
    fontSize: 10,
    letterSpacing: 1,
    textAlign: 'center',
    margin: 25,
  },
});
