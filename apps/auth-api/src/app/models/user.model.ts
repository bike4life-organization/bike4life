import { User } from '@bike4life/commons'
import { Schema, model } from 'mongoose'

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
})

export const UserModel = model<User>('User', userSchema)
