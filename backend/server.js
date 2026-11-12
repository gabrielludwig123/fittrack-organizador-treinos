
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const treinosRoutes = require('./routes/treinosRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/treinos', treinosRoutes);
app.use('/auth', authRoutes);

// Rota inicial
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API FitTrack funcionando!'
  });
});

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    const conexao = await db.getConnection();
    conexao.release();

    console.log('Conectado ao MySQL com sucesso!');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

  } catch (erro) {
    console.error('Erro ao conectar ao MySQL:', erro.message);
  }
}

iniciarServidor();
