
const API_URL = 'http://172.20.134.196:3000';

// Realizar login
export async function fazerLogin(email, senha) {
  const resposta = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || 'Erro ao fazer login');
  }

  return dados;
}

// Buscar treinos com JWT
export async function buscarTreinos(token) {
  const resposta = await fetch(`${API_URL}/treinos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!resposta.ok) {
    throw new Error('Erro ao buscar treinos');
  }

  return await resposta.json();
}

// Cadastrar treino
export async function cadastrarTreino(token, treino) {
  const resposta = await fetch(`${API_URL}/treinos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(treino),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || 'Erro ao cadastrar treino');
  }

  return dados;
}

// Atualizar treino
export async function atualizarTreino(token, id, treino) {
  const resposta = await fetch(`${API_URL}/treinos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(treino),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || 'Erro ao atualizar treino');
  }

  return dados;
}

// Excluir treino
export async function excluirTreino(token, id) {
  const resposta = await fetch(`${API_URL}/treinos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || 'Erro ao excluir treino');
  }

  return dados;
}
