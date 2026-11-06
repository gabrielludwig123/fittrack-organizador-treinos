
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Buscar todos os treinos cadastrados
router.get('/', async (req, res) => {
  try {
    const [treinos] = await db.query(
      'SELECT * FROM treinos ORDER BY id DESC'
    );

    res.json(treinos);
  } catch (erro) {
    console.error('Erro ao buscar treinos:', erro);
    res.status(500).json({
      mensagem: 'Erro ao buscar treinos'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, descricao, categoria, duracao } = req.body;

    if (
      typeof nome !== 'string' ||
      !nome.trim() ||
      !Number.isInteger(duracao) ||
      duracao <= 0
    ) {
      return res.status(400).json({
        mensagem: 'Informe um nome e uma duração válida.'
      });
    }

    const [resultado] = await db.query(
      `INSERT INTO treinos
       (nome, descricao, categoria, duracao)
       VALUES (?, ?, ?, ?)`,
      [nome.trim(), descricao || null, categoria || null, duracao]
    );

    res.status(201).json({
      mensagem: 'Treino cadastrado com sucesso!',
      id: resultado.insertId
    });
  } catch (erro) {
    console.error('Erro ao cadastrar treino:', erro);

    res.status(500).json({
      mensagem: 'Erro ao cadastrar treino.'
    });
  }
});

module.exports = router;
