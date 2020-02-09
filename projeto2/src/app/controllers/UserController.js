import User from '../models/User';

class UserController {
  async store(req, res) {

    const persisted = await User.findOne({
      where: { email: req.body.email }
    });

    if(persisted) {
      return res.status(400).json({ error: 'Usuario ja existe' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      email,
      name
    })
  }

  async update(req, res) {

    console.log(req.userId);

    return res.json({ ok: true });
  }
}

export default new UserController();