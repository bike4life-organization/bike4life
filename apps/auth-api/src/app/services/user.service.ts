import { encryptString } from '@bike4life/commons';
import { User, UserModel } from '../models/user.model';

export class UserService {
  async getUserById(id: string): Promise<User> {
    return UserModel
      .findById(id)
      .exec()
  }

  async createUser(newUser: User): Promise<void> {
    const user: User = {
      ...newUser,
      password: encryptString(newUser.password),
    }

    await UserModel.create(user)
  }
}
