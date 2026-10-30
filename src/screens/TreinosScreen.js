
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

const treinos = [
  {
    id: '1',
    letra: 'A',
    nome: 'Peito e tríceps',
    grupo: 'MEMBROS SUPERIORES',
    duracao: '45 min',
    exercicios: [
      'Supino reto',
      'Supino inclinado',
      'Tríceps na polia',
    ],
  },
  {
    id: '2',
    letra: 'B',
    nome: 'Costas e bíceps',
    grupo: 'MEMBROS SUPERIORES',
    duracao: '45 min',
    exercicios: [
      'Puxada frontal',
      'Remada baixa',
      'Rosca direta',
    ],
  },
  {
    id: '3',
    letra: 'C',
    nome: 'Pernas',
    grupo: 'MEMBROS INFERIORES',
    duracao: '50 min',
    exercicios: [
      'Agachamento',
      'Cadeira extensora',
      'Mesa flexora',
    ],
  },
];

export default function TreinosScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.intro}>
        <Text style={styles.etiqueta}>SUA ROTINA</Text>

        <Text style={styles.titulo}>
          Biblioteca de treinos
        </Text>

        <Text style={styles.descricao}>
          Consulte os exemplos de exercícios
          organizados por grupo muscular.
        </Text>
      </View>

      <View style={styles.aviso}>
        <Text style={styles.avisoTitulo}>
          Versão demonstrativa
        </Text>
        <Text style={styles.avisoTexto}>
          Os treinos abaixo são exemplos de
          apresentação. A personalização será
          desenvolvida nas próximas etapas.
        </Text>
      </View>

      {treinos.map((treino) => (
        <View key={treino.id} style={styles.card}>
          <View style={styles.cardTopo}>
            <View style={styles.letraBox}>
              <Text style={styles.letra}>
                {treino.letra}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.grupo}>
                {treino.grupo}
              </Text>
              <Text style={styles.nome}>
                {treino.nome}
              </Text>
              <Text style={styles.duracao}>
                {treino.duracao} · Exemplo
              </Text>
            </View>
          </View>

          <View style={styles.divisor} />

          {treino.exercicios.map((exercicio, index) => (
            <View
              key={`${treino.id}-${index}`}
              style={styles.exercicio}
            >
              <Text style={styles.ponto}>•</Text>
              <Text style={styles.exercicioTexto}>
                {exercicio}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1220',
  },
  intro: {
    padding: 22,
    paddingBottom: 15,
  },
  etiqueta: {
    color: '#8BE35D',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 10,
  },
  descricao: {
    color: '#A9B7CA',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
  aviso: {
    backgroundColor: '#182B24',
    borderColor: '#355B40',
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 18,
  },
  avisoTitulo: {
    color: '#8BE35D',
    fontWeight: 'bold',
    fontSize: 14,
  },
  avisoTexto: {
    color: '#C2D2C6',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
  card: {
    backgroundColor: '#17263A',
    borderWidth: 1,
    borderColor: '#30445B',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  cardTopo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  letraBox: {
    width: 48,
    height: 48,
    backgroundColor: '#263E32',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
  letra: {
    color: '#8BE35D',
    fontSize: 22,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  grupo: {
    color: '#8BE35D',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  nome: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 5,
  },
  duracao: {
    color: '#A9B7CA',
    fontSize: 12,
    marginTop: 5,
  },
  divisor: {
    height: 1,
    backgroundColor: '#30445B',
    marginVertical: 16,
  },
  exercicio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ponto: {
    color: '#8BE35D',
    fontSize: 20,
    marginRight: 10,
  },
  exercicioTexto: {
    color: '#D5DFEC',
    fontSize: 14,
  },
});
