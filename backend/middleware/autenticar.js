
const jwt = require('jsonwebtoken');
const db = require('../config/db');

async function autenticar(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      mensagem: 'Token não informado.'
    });
  }

  const token = authorization.slice(7);

  try {
    const dados = jwt.verify(
      token,
      process.env.JWT_SECRET,
      { algorithms: ['HS256'] }
    );

    const [usuarios] = await db.query(
      'SELECT id, nome, email, nivel FROM usuarios WHERE id = ?',
      [dados.id]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({
        mensagem: 'Usuário não encontrado.'
      });
    }

    req.usuario = usuarios[0];

    next();

  } catch (erro) {
    if (
      erro.name === 'JsonWebTokenError' ||
      erro.name === 'TokenExpiredError' ||
      erro.name === 'NotBeforeError'
    ) {
      return res.status(401).json({
        mensagem: 'Token inválido ou expirado.'
      });
    }

    console.error('Erro na autenticação:', erro.message);

    return res.status(500).json({
      mensagem: 'Erro interno na autenticação.'
    });
  }
}

module.exports = autenticar;
