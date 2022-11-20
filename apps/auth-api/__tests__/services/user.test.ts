import { UserModel } from '../../src/app/models/user.model';
import { UserService } from '../../src/app/services/user.service'
import * as mockingoose from 'mockingoose'

const mockUser = {
  _id: '637a84fe0aea056e2ff60b72',
  username: 'username1',
  password: '36e3b3d1e6f04daf874d355e5acce856a6774435',
  email: 'email@gmail.com',
  emailVerified: false,
  createdAt: '2022-11-20T19:50:22.291Z',
}

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
