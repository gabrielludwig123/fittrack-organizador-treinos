
import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable,
  StyleSheet, Alert, ActivityIndicator
} from 'react-native';

import { fazerLogin } from '../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    if (!email.trim() || !senha) {
      Alert.alert('Atenção', 'Preencha email e senha.');
      return;
    }

    setCarregando(true);

    try {
      const dados = await fazerLogin(email.trim(), senha);

      navigation.replace('Inicio', {
        token: dados.token,
        usuario: dados.usuario
      });
    } catch (erro) {
      Alert.alert('Erro no login', erro.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FitTrack</Text>
      <Text style={styles.subtitulo}>
        Seu treino, sua evolução.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#94A3B8"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#94A3B8"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Pressable
        style={styles.botao}
        onPress={entrar}
        disabled={carregando}
      >
        {carregando
          ? <ActivityIndicator color="#FFFFFF" />
          : <Text style={styles.textoBotao}>Entrar</Text>
        }
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1220',
    justifyContent: 'center',
    padding: 25
  },
  logo: {
    color: '#38BDF8',
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitulo: {
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 35,
    marginTop: 8
  },
  input: {
    backgroundColor: '#1E293B',
    color: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15
  },
  botao: {
    backgroundColor: '#0284C7',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold'
  }
});
