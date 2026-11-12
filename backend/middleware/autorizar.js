
function autorizar(...niveisPermitidos) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({
        mensagem: 'Usuário não autenticado.'
      });
    }

    if (!niveisPermitidos.includes(req.usuario.nivel)) {
      return res.status(403).json({
        mensagem: 'Você não tem permissão para acessar esta rota.'
      });
    }

    next();
  };
}

module.exports = autorizar;
