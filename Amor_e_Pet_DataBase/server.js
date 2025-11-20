const path = require('path');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post('/login', (req, res) => {
  const { email, senha } = req.body || {};

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  const user = router.db.get('usuarios').find({ email }).value();

  if (!user || user.senha !== senha) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const { senha: _senha, ...usuario } = user;

  return res.status(200).json({
    message: 'Login realizado com sucesso.',
    usuario
  });
});

server.use(router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`API Amor & Pet disponível em http://localhost:${PORT}`);
});
