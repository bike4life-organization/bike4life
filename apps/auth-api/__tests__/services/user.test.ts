import { UserModel } from '../../src/app/models/user.model';
import { UserService } from '../../src/app/services/user.service'
import * as mockingoose from 'mockingoose'
import { mockUser } from '../support/users'
import { encryptString } from '@bike4life/commons';

describe('User service', () => {
  const service = new UserService();

  afterEach(() => {
    jest.restoreAllMocks()
    mockingoose.resetAll()
  })

  it('getUserById should return a user', async () => {
    mockingoose(UserModel).toReturn(mockUser, 'findOne');

    const result = await service.getUserById(mockUser._id)
    expect(result.username).toBe('username1')
  })

  it('login should return a token', async () => {
    const password = 'password1'
    const encryptedPassword = encryptString(password)
    mockingoose(UserModel).toReturn({ ...mockUser, password: encryptedPassword }, 'findOne');

    const result = await service.login(mockUser.email, password)
    expect(result).toBeDefined()
  })
})
