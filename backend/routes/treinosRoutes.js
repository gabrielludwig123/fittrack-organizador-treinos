
const express = require('express');
const router = express.Router();
const db = require('../config/db');

const autenticar = require('../middleware/autenticar');
const autorizar = require('../middleware/autorizar');

// Todas as rotas exigem autenticação
router.use(autenticar);

// Consultar treinos
router.get('/', async (req, res) => {
  try {
    const admin = req.usuario.nivel === 'admin';

    const [treinos] = await db.query(
      admin
        ? 'SELECT * FROM treinos ORDER BY id DESC'
        : 'SELECT * FROM treinos WHERE usuario_id = ? ORDER BY id DESC',
      admin ? [] : [req.usuario.id]
    );

    res.json(treinos);
  } catch (erro) {
    console.error('Erro ao buscar treinos:', erro.message);
    res.status(500).json({
      mensagem: 'Erro ao buscar treinos.'
    });
  }
});

// Cadastrar treino
router.post('/', async (req, res) => {
  try {
    const { nome, descricao, categoria, duracao } = req.body;

    if (
      typeof nome !== 'string' ||
      !nome.trim() ||
      nome.trim().length > 100 ||
      !Number.isInteger(duracao) ||
      duracao <= 0
    ) {
      return res.status(400).json({
        mensagem: 'Informe um nome e uma duração válida.'
      });
    }

    const [resultado] = await db.query(
      `INSERT INTO treinos
       (nome, descricao, categoria, duracao, usuario_id)
       VALUES (?, ?, ?, ?, ?)`,
      [
        nome.trim(),
        descricao || null,
        categoria || null,
        duracao,
        req.usuario.id
      ]
    );

    res.status(201).json({
      mensagem: 'Treino cadastrado com sucesso!',
      id: resultado.insertId
    });
  } catch (erro) {
    console.error('Erro ao cadastrar treino:', erro.message);
    res.status(500).json({
      mensagem: 'Erro ao cadastrar treino.'
    });
  }
});

// Editar treino
router.put('/:id', async (req, res) => {
  try {
    const { nome, descricao, categoria, duracao } = req.body;
    const id = Number(req.params.id);

    if (
      !Number.isInteger(id) ||
      id <= 0 ||
      typeof nome !== 'string' ||
      !nome.trim() ||
      nome.trim().length > 100 ||
      !Number.isInteger(duracao) ||
      duracao <= 0
    ) {
      return res.status(400).json({
        mensagem: 'Dados do treino inválidos.'
      });
    }

    const admin = req.usuario.nivel === 'admin';

    const [resultado] = await db.query(
      `UPDATE treinos
       SET nome = ?, descricao = ?, categoria = ?, duracao = ?
       WHERE id = ? ${admin ? '' : 'AND usuario_id = ?'}`,
      [
        nome.trim(),
        descricao || null,
        categoria || null,
        duracao,
        id,
        ...(!admin ? [req.usuario.id] : [])
      ]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: 'Treino não encontrado ou acesso não permitido.'
      });
    }

    res.json({
      mensagem: 'Treino atualizado com sucesso!'
    });
  } catch (erro) {
    console.error('Erro ao atualizar treino:', erro.message);
    res.status(500).json({
      mensagem: 'Erro ao atualizar treino.'
    });
  }
});

// Excluir treino
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: 'ID inválido.'
      });
    }

    const admin = req.usuario.nivel === 'admin';

    const [resultado] = await db.query(
      admin
        ? 'DELETE FROM treinos WHERE id = ?'
        : 'DELETE FROM treinos WHERE id = ? AND usuario_id = ?',
      admin ? [id] : [id, req.usuario.id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: 'Treino não encontrado ou acesso não permitido.'
      });
    }

    res.json({
      mensagem: 'Treino excluído com sucesso!'
    });
  } catch (erro) {
    console.error('Erro ao excluir treino:', erro.message);
    res.status(500).json({
      mensagem: 'Erro ao excluir treino.'
    });
  }
});

module.exports = router;
