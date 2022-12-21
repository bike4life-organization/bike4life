import { decryptString, encryptString, User } from '@bike4life/commons';
import { UserModel } from '../models/user.model';
import { JwtService } from './jwt.service';
import { avatarSettings } from '../settings'

const EDITABLE_FIELDS = ['firstName', 'lastName', 'avatar', 'password']

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
      avatar: userWithPassword.avatar || avatarSettings.defaultAvatar,
      firstName: userWithPassword.firstName,
      lastName: userWithPassword.lastName
    }
    return userWithoutPassword
  }

  async create(newUser: User): Promise<User> {
    const user: User = {
      ...newUser,
      password: encryptString(newUser.password),
    }

    return UserModel.create(user)
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

  async delete(id: string): Promise<void> {
    await UserModel
      .findByIdAndDelete(id)
      .exec()
  }

  async update(id: string, user: User): Promise<User> {
    const originalUser = await this.getUserById(id)

    EDITABLE_FIELDS.forEach(field => {
      if (user[field]) {
        originalUser[field] = user[field]
      }
    })

    if (user.password) {
      user.password = encryptString(user.password)
    }

    await UserModel.findByIdAndUpdate(id, user).exec()
    return await this.getUserById(id)
  }
}
