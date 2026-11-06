
const API_URL = 'http://172.20.134.196:3000';

export async function buscarTreinos() {
  const resposta = await fetch(`${API_URL}/treinos`);

  if (!resposta.ok) {
    throw new Error('Erro ao buscar treinos');
  }

  return await resposta.json();
}
