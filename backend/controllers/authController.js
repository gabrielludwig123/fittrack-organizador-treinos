
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// CADASTRO DE USUÁRIOS
exports.cadastrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem: 'Preencha todos os campos.'
      });
    }

    if (typeof nome !== 'string' ||
        typeof email !== 'string' ||
        typeof senha !== 'string' ||
        nome.trim().length > 100 ||
        email.trim().length > 150 ||
        senha.length < 8 ||
        senha.length > 72) {
      return res.status(400).json({
        mensagem: 'Dados inválidos. Use uma senha de 8 a 72 caracteres.'
      });
    }

    const emailNormalizado = email.trim().toLowerCase();

    const [usuarios] = await db.query(
      'SELECT id FROM usuarios WHERE email = ?',
      [emailNormalizado]
    );

    if (usuarios.length > 0) {
      return res.status(409).json({
        mensagem: 'Este e-mail já está cadastrado.'
      });
    }

    const senhaHash = await bcrypt.hash(senha, 12);

    await db.query(
      `INSERT INTO usuarios (nome, email, senha, nivel)
       VALUES (?, ?, ?, 'usuario')`,
      [nome.trim(), emailNormalizado, senhaHash]
    );

    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!'
    });

  } catch (erro) {
    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        mensagem: 'Este e-mail já está cadastrado.'
      });
    }

    console.error('Erro no cadastro:', erro.message);

    return res.status(500).json({
      mensagem: 'Erro ao cadastrar usuário.'
    });
  }
};

// LOGIN DE USUÁRIOS
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (typeof email !== 'string' ||
        typeof senha !== 'string' ||
        !email.trim() ||
        !senha) {
      return res.status(400).json({
        mensagem: 'Informe e-mail e senha.'
      });
    }

    const [usuarios] = await db.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email.trim().toLowerCase()]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({
        mensagem: 'E-mail ou senha inválidos.'
      });
    }

    const usuario = usuarios[0];

    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaCorreta) {
      return res.status(401).json({
        mensagem: 'E-mail ou senha inválidos.'
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não configurado.');
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nivel: usuario.nivel
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h', algorithm: 'HS256' }
    );

    return res.json({
      mensagem: 'Login realizado com sucesso!',
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        nivel: usuario.nivel
      }
    });

  } catch (erro) {
    console.error('Erro no login:', erro.message);

    return res.status(500).json({
      mensagem: 'Erro ao realizar login.'
    });
  }
};
