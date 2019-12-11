import User from '../models/User';

class SessionController {
  async store(req, res) {
    const email = req.body.email;

    //verifica se o usuario ja nao existe
    let user = await User.findOne({ email: email });
    if(!user) {
      user = await User.create({ email: email })
    }

    return res.json({user});
  }
}

export default new SessionController();