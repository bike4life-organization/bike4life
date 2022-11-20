import { Schema, model } from 'mongoose'

export interface User {
  email: string
  username: string
  emailVerified: boolean
  createdAt: Date
  password?: string
  avatar?: string
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true
  },
  password: {
      type: String,
      required: true
  },
  email: {
    type: String,
    required: true
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
  }
})

export const UserModel = model<User>('User', userSchema)
