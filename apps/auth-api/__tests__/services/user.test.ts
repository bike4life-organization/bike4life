import { UserModel } from '../../src/app/models/user.model';
import { UserService } from '../../src/app/services/user.service'
import * as mockingoose from 'mockingoose'
import { mockUser } from '../support/users'

describe('User service', () => {
  const service = new UserService();

  beforeEach(() => {
    mockingoose(UserModel).toReturn(mockUser, 'findOne');
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('getUserById should return a user', async () => {
    const result = await service.getUserById(mockUser._id)
    expect(result.username).toBe('username1')
  })
})
