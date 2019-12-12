import User from '../models/User';
import * as Yup from 'yup';

class SessionController {

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required()
    });

    const email = req.body.email;

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    //verifica se o usuario ja nao existe
    let user = await User.findOne({ email: email });
    if(!user) {
      user = await User.create({ email: email })
    }

    return res.json({user});
  }

}

export default new SessionController();