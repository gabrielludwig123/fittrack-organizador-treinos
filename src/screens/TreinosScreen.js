import React, { useCallback, useEffect, useState, useRef } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';

import {
  buscarTreinos,
  cadastrarTreino,
  atualizarTreino,
  excluirTreino,
} from '../services/api';

const modelos = [
  {
    nome: 'Treino A — Peito e tríceps',
    categoria: 'Peito e tríceps',
    duracao: 45,
    descricao: 'Supino reto\nSupino inclinado\nCrucifixo\nTríceps na polia',
  },
  {
    nome: 'Treino B — Costas e bíceps',
    categoria: 'Costas e bíceps',
    duracao: 45,
    descricao: 'Puxada frontal\nRemada baixa\nRemada unilateral\nRosca direta',
  },
  {
    nome: 'Treino C — Pernas',
    categoria: 'Pernas',
    duracao: 50,
    descricao: 'Agachamento\nLeg press\nCadeira extensora\nMesa flexora\nPanturrilha',
  },
  {
    nome: 'Treino D — Ombros',
    categoria: 'Ombros',
    duracao: 40,
    descricao: 'Desenvolvimento com halteres\nElevação lateral\nElevação frontal\nCrucifixo inverso',
  },
  {
    nome: 'Treino E — Abdômen',
    categoria: 'Abdômen',
    duracao: 25,
    descricao: 'Abdominal tradicional\nPrancha\nAbdominal bicicleta\nElevação de pernas',
  },
];

function avisar(titulo, mensagem) {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}: ${mensagem}`);
  } else {
    Alert.alert(titulo, mensagem);
  }
}

export default function TreinosScreen({ route }) {
  const token = route.params?.token;
  const scrollRef = useRef(null);
  const formY = useRef(0);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [treinos, setTreinos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [excluindoId, setExcluindoId] = useState(null);

  const [editandoId, setEditandoId] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [duracao, setDuracao] = useState('');

  const carregarTreinos = useCallback(async () => {
    if (!token) {
      setCarregando(false);
      avisar('Erro', 'Faça login novamente.');
      return;
    }

    setCarregando(true);

    try {
      const dados = await buscarTreinos(token);
      setTreinos(Array.isArray(dados) ? dados : []);
    } catch (erro) {
      avisar('Erro', erro.message);
    } finally {
      setCarregando(false);
    }
  }, [token]);

  useEffect(() => {
    carregarTreinos();
  }, [carregarTreinos]);

  function limparFormulario() {
    setMostrarFormulario(false);
    setEditandoId(null);
    setNome('');
    setDescricao('');
    setCategoria('');
    setDuracao('');
  }

  function iniciarEdicao(treino) {
    setMostrarFormulario(true);
    setEditandoId(treino.id);
    setNome(treino.nome || '');
    setDescricao(treino.descricao || '');
    setCategoria(treino.categoria || '');
    setDuracao(String(treino.duracao || ''));
  }

  async function salvarTreino() {
    const minutos = Number(duracao.trim());

    if (!nome.trim() || nome.trim().length > 100) {
      avisar('Atenção', 'Informe um nome de até 100 caracteres.');
      return;
    }

    if (!Number.isInteger(minutos) || minutos <= 0) {
      avisar('Atenção', 'Informe uma duração válida em minutos.');
      return;
    }

    if (!token || salvando) return;

    const treino = {
      nome: nome.trim(),
      descricao: descricao.trim(),
      categoria: categoria.trim(),
      duracao: minutos,
    };

    setSalvando(true);

    try {
      if (editandoId !== null) {
        await atualizarTreino(token, editandoId, treino);
        avisar('Sucesso', 'Treino atualizado!');
      } else {
        await cadastrarTreino(token, treino);
        avisar('Sucesso', 'Treino cadastrado!');
      }

      limparFormulario();
      await carregarTreinos();
    } catch (erro) {
      avisar('Erro', erro.message);
    } finally {
      setSalvando(false);
    }
  }

  async function adicionarModelo(modelo) {
    if (!token || salvando) return;

    setSalvando(true);

    try {
      await cadastrarTreino(token, modelo);
      await carregarTreinos();
      avisar('Sucesso', 'Treino adicionado à sua lista!');
    } catch (erro) {
      avisar('Erro', erro.message);
    } finally {
      setSalvando(false);
    }
  }

  function confirmarExclusao(id) {
    if (Platform.OS === 'web') {
      if (window.confirm('Tem certeza que deseja excluir este treino?')) {
        removerTreino(id);
      }
      return;
    }

    Alert.alert(
      'Excluir treino',
      'Tem certeza que deseja excluir este treino?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => removerTreino(id),
        },
      ]
    );
  }

  async function removerTreino(id) {
    if (!token || excluindoId !== null) return;

    setExcluindoId(id);

    try {
      await excluirTreino(token, id);

      if (editandoId === id) {
        limparFormulario();
      }

      await carregarTreinos();
      avisar('Sucesso', 'Treino excluído!');
    } catch (erro) {
      avisar('Erro', erro.message);
    } finally {
      setExcluindoId(null);
    }
  }

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.marca}>FITTRACK</Text>

      <Text style={styles.titulo}>MEUS TREINOS</Text>

      <Text style={styles.subtitulo}>
        Organize sua rotina e evolua a cada treino.
      </Text>

      <Text style={[styles.listaTitulo, { marginBottom: 16 }]}>
        TREINOS DISPONÍVEIS
      </Text>

      {modelos.map((modelo) => (
        <View key={modelo.nome} style={styles.card}>
          <Text style={styles.nome}>
            {modelo.nome}
          </Text>

          <View style={styles.info}>
            <Text style={styles.detalhe}>
              {modelo.categoria}
            </Text>

            <Text style={styles.detalhe}>
              {modelo.duracao} min
            </Text>
          </View>

          {modelo.descricao.split('\n').map((exercicio) => (
            <Text
              key={exercicio}
              style={[styles.descricao, { marginBottom: 8 }]}
            >
              • {exercicio}
            </Text>
          ))}

          <TouchableOpacity
            style={styles.botaoEditar}
            disabled={salvando || !token}
            onPress={() => adicionarModelo(modelo)}
          >
            <Text style={styles.textoEditar}>
              + ADICIONAR AOS MEUS TREINOS
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={[styles.botaoPrincipal, { marginBottom: 20 }]}
        onPress={() => {
          limparFormulario();
          setMostrarFormulario(!mostrarFormulario);
        }}
        disabled={salvando}
      >
        <Text style={styles.botaoPrincipalTexto}>
          {mostrarFormulario
            ? 'FECHAR FORMULÁRIO'
            : '+ NOVO TREINO'}
        </Text>
      </TouchableOpacity>

      {mostrarFormulario && (
        <View
          style={styles.formulario}
          onLayout={(e) => {
            formY.current = e.nativeEvent.layout.y;

            if (editandoId !== null) {
              scrollRef.current?.scrollTo({
                y: formY.current,
                animated: true,
              });
            }
          }}
        >
          <Text style={styles.formTitulo}>
            {editandoId !== null
              ? 'EDITAR TREINO'
              : 'NOVO TREINO'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nome do treino"
            placeholderTextColor="#8291A5"
            value={nome}
            onChangeText={setNome}
            maxLength={100}
          />

          <TextInput
            style={[styles.input, styles.inputDescricao]}
            placeholder="Descrição"
            placeholderTextColor="#8291A5"
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />

          <TextInput
            style={styles.input}
            placeholder="Categoria"
            placeholderTextColor="#8291A5"
            value={categoria}
            onChangeText={setCategoria}
          />

          <TextInput
            style={styles.input}
            placeholder="Duração em minutos"
            placeholderTextColor="#8291A5"
            value={duracao}
            onChangeText={setDuracao}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.botaoPrincipal}
            onPress={salvarTreino}
            disabled={salvando}
          >
            <Text style={styles.botaoPrincipalTexto}>
              {salvando
                ? 'SALVANDO...'
                : editandoId !== null
                ? 'SALVAR ALTERAÇÕES'
                : '+ CADASTRAR TREINO'}
            </Text>
          </TouchableOpacity>

          {editandoId !== null && (
            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={limparFormulario}
              disabled={salvando}
            >
              <Text style={styles.textoCancelar}>
                Cancelar edição
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={styles.cabecalhoLista}>
        <Text style={styles.listaTitulo}>
          TREINOS CADASTRADOS
        </Text>

        <TouchableOpacity onPress={carregarTreinos}>
          <Text style={styles.atualizar}>
            Atualizar
          </Text>
        </TouchableOpacity>
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color="#8BE35D" />
      ) : treinos.length === 0 ? (
        <Text style={styles.vazio}>
          Nenhum treino cadastrado ainda.
        </Text>
      ) : (
        treinos.map((treino) => (
          <View key={treino.id} style={styles.card}>
            <Text style={styles.nome}>
              {treino.nome}
            </Text>

            <Text style={styles.descricao}>
              {treino.descricao || 'Sem descrição'}
            </Text>

            <View style={styles.info}>
              <Text style={styles.detalhe}>
                {treino.categoria || 'Sem categoria'}
              </Text>

              <Text style={styles.detalhe}>
                {treino.duracao} min
              </Text>
            </View>

            <View style={styles.acoes}>
              <TouchableOpacity
                style={styles.botaoEditar}
                onPress={() => iniciarEdicao(treino)}
              >
                <Text style={styles.textoEditar}>
                  EDITAR
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoExcluir}
                onPress={() => confirmarExclusao(treino.id)}
                disabled={excluindoId !== null}
              >
                <Text style={styles.textoExcluir}>
                  {excluindoId === treino.id
                    ? 'EXCLUINDO...'
                    : 'EXCLUIR'}
                </Text>
              </TouchableOpacity>
            </View>
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
  },

  conteudo: {
    padding: 20,
    paddingBottom: 50,
  },

  marca: {
    color: '#8BE35D',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginTop: 10,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 12,
  },

  subtitulo: {
    color: '#A9B7CA',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 25,
  },

  formulario: {
    backgroundColor: '#17263A',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#30445B',
    marginBottom: 30,
  },

  formTitulo: {
    color: '#8BE35D',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#0B1220',
    color: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#30445B',
    fontSize: 14,
  },

  inputDescricao: {
    minHeight: 75,
    textAlignVertical: 'top',
  },

  botaoPrincipal: {
    backgroundColor: '#8BE35D',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },

  botaoPrincipalTexto: {
    color: '#0B1220',
    fontWeight: 'bold',
    fontSize: 14,
  },

  botaoCancelar: {
    alignItems: 'center',
    padding: 12,
  },

  textoCancelar: {
    color: '#A9B7CA',
  },

  cabecalhoLista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  listaTitulo: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  atualizar: {
    color: '#8BE35D',
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#17263A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#30445B',
  },

  nome: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  descricao: {
    color: '#A9B7CA',
    fontSize: 14,
    marginBottom: 15,
  },

  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  detalhe: {
    color: '#8BE35D',
    fontSize: 13,
    fontWeight: 'bold',
  },

  acoes: {
    flexDirection: 'row',
    gap: 10,
  },

  botaoEditar: {
    flex: 1,
    backgroundColor: '#30445B',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },

  textoEditar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  botaoExcluir: {
    flex: 1,
    backgroundColor: '#542B36',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },

  textoExcluir: {
    color: '#FF9BA7',
    fontWeight: 'bold',
  },

  vazio: {
    color: '#A9B7CA',
    textAlign: 'center',
    marginTop: 25,
  },
});