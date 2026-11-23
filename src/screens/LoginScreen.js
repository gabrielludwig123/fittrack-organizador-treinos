
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import {
  fazerLogin,
  cadastrarUsuario,
} from '../services/api';

export default function LoginScreen({ navigation }) {
  const [cadastro, setCadastro] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function enviar() {
    if (!email.trim() || !senha || (cadastro && !nome.trim())) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (cadastro && (senha.length < 8 || senha.length > 72)) {
      Alert.alert(
        'Atenção',
        'A senha deve ter entre 8 e 72 caracteres.'
      );
      return;
    }

    setCarregando(true);

    try {
      if (cadastro) {
        await cadastrarUsuario(
          nome.trim(),
          email.trim().toLowerCase(),
          senha
        );

        Alert.alert(
          'Sucesso',
          'Conta criada! Agora faça seu login.'
        );

        setCadastro(false);
        setNome('');
        setSenha('');
      } else {
        const dados = await fazerLogin(email.trim(), senha);

        navigation.replace('Inicio', {
          token: dados.token,
          usuario: dados.usuario,
        });
      }
    } catch (erro) {
      Alert.alert('Erro', erro.message);
    } finally {
      setCarregando(false);
    }
  }

  function alternarModo() {
    setCadastro(!cadastro);
    setNome('');
    setSenha('');
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.logo}>FITTRACK</Text>

      <Text style={styles.subtitulo}>
        Seu treino. Sua evolução.
      </Text>

      <View style={styles.card}>
        <Text style={styles.titulo}>
          {cadastro ? 'Criar conta' : 'Bem-vindo de volta'}
        </Text>

        <Text style={styles.descricao}>
          {cadastro
            ? 'Cadastre-se para organizar seus treinos.'
            : 'Entre na sua conta para continuar.'}
        </Text>

        {cadastro && (
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor="#94A3B8"
            value={nome}
            onChangeText={setNome}
            maxLength={100}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#94A3B8"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          maxLength={150}
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
          onPress={enviar}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#0B1220" />
          ) : (
            <Text style={styles.textoBotao}>
              {cadastro ? 'CRIAR CONTA' : 'ENTRAR'}
            </Text>
          )}
        </Pressable>

        <Pressable
          style={styles.alternar}
          onPress={alternarModo}
          disabled={carregando}
        >
          <Text style={styles.alternarTexto}>
            {cadastro
              ? 'Já tem uma conta? Entrar'
              : 'Não tem uma conta? Cadastre-se'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1220',
  },
  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
  },
  logo: {
    color: '#8BE35D',
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 3,
  },
  subtitulo: {
    color: '#A9B7CA',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 35,
  },
  card: {
    backgroundColor: '#17263A',
    padding: 24,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#30445B',
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descricao: {
    color: '#A9B7CA',
    fontSize: 14,
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#0B1220',
    color: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#30445B',
  },
  botao: {
    backgroundColor: '#8BE35D',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#0B1220',
    fontSize: 16,
    fontWeight: 'bold',
  },
  alternar: {
    marginTop: 22,
    alignItems: 'center',
  },
  alternarTexto: {
    color: '#8BE35D',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
