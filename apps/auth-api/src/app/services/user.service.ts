import { decryptString, encryptString, User } from '@bike4life/commons';
import { UserModel } from '../models/user.model';
import { JwtService } from './jwt.service';
import { avatarSettings } from '../settings'

export class UserService {
  async getUserById(id: string): Promise<User> {
    const userWithPassword = await UserModel
      .findById(id)
      .exec()

    const userWithoutPassword: User = {
      username: userWithPassword.username,
      createdAt: userWithPassword.createdAt,
      email: userWithPassword.email,
      _id: userWithPassword._id,
      emailVerified: userWithPassword.emailVerified,
      avatar: userWithPassword.avatar || avatarSettings.defaultAvatar
    }
    return userWithoutPassword
  }

  async createUser(newUser: User): Promise<void> {
    const user: User = {
      ...newUser,
      password: encryptString(newUser.password),
    }

    await UserModel.create(user)
  }

  async login(email: string, password: string): Promise<string> {
    const user = await UserModel
      .findOne({ email })
      .exec()

    if (!user) {
      throw new Error('User not found')
    }

    if (decryptString(user.password) !== password) {
      throw new Error('Invalid credentials')
    }

    return JwtService.generateToken(user)
  }
}
