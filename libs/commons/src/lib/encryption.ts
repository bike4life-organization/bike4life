import * as crypto from 'crypto'

const ENCRYPTION_ALGORITHM = 'aes-256-ctr'
const ENCRYPTION_SECRET_KEY = process.env.ENCRYPTION_SECRET_KEY
const ENCRYPTION_IV_LENGTH = 16

export function encryptString (plaintextValue: string): string {
  const iv = crypto.randomBytes(ENCRYPTION_IV_LENGTH)
  const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, ENCRYPTION_SECRET_KEY, iv)
  const encryptedTextAndIv = Buffer.concat([iv, cipher.update(plaintextValue)])
  cipher.final()

  return encryptedTextAndIv.toString('hex')
}

export function decryptString (encryptedTextAndIV: string): string {
  const encryptedTextAndIvBuffer = Buffer.from(encryptedTextAndIV, 'hex')
  const iv = encryptedTextAndIvBuffer.slice(0, ENCRYPTION_IV_LENGTH)
  if (iv.length === 0) {
    throw new Error('Invalid initialization vector.')
  }
  const encryptedText = encryptedTextAndIvBuffer.slice(ENCRYPTION_IV_LENGTH)

  const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, ENCRYPTION_SECRET_KEY, iv)
  const decipherPlainText = decipher.update(encryptedText.toString('hex'), 'hex', 'utf8')
  decipher.final()

  return decipherPlainText
}
