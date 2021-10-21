import { Ierror } from 'src/interfaces/error'
import { compare } from 'bcrypt'
import Users from '../entity/Users'
import { Service } from 'typedi'
import { IvalidationObject } from '../interfaces/validationObject'
import { sign } from 'jsonwebtoken'

@Service()
export class LoginService {
  login = async (data): Promise<IvalidationObject | Ierror> => {
    const user = await Users.findOne({ email: data.email })
    if (!user) {
      return { error: true, name: 'Validation', message: 'Wrong email/password combination' }
    }

    const passwordMatched = await compare(data.password, user.password)
    if (!passwordMatched) {
      return { error: true, name: 'Validation', message: 'Wrong email/password combination' }
    }

    const { JWT_SECRET: secret, JTW_EXPIRATION: expiresIn } = process.env
    const token = await sign({}, secret, { subject: user.id.toString(), expiresIn })
    console.log(user)

    return { token, userId: user.id + '' }
  };
}
