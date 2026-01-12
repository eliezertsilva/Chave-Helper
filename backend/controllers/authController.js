const db = require('../models');
const argon2 = require('argon2');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) return res.status(401).json({ message: 'Senha incorreta' });

    return res.json({ 
      token: 'jwt-token-' + user.id, 
      user: { name: user.name, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
