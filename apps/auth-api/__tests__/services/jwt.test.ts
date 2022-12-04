import { mockUser } from '../support/users'
import { JwtService } from '../../src/app/services/jwt.service'

describe('JWT service', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should return a JWT token', async () => {
    const result = JwtService.generateToken({
      _id: 'fake-user-id',
      email: mockUser.email,
      username: mockUser.username,
      createdAt: new Date(),
      emailVerified: true
    })
    expect(result).toBeDefined()
  })
})
